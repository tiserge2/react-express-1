const express       = require('express');
const path          = require('path'); 
const http          = require('http');
const socketIO      = require('socket.io');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');

const app           = express();
const configDB      = require('./config/database')
const VisitSchema   = require('./models/visit.model')


// Serve the static files from the React app
console.log("parent: ", path.resolve(__dirname, ".."))

app.use(express.static(path.join(path.resolve(__dirname, ".."), 'client/build')));

app.use(express.static(__dirname));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

//connection to the database
mongoose.connect(configDB.online_url,
    {
            useNewUrlParser: true,
            useUnifiedTopology: true
    }
);
mongoose.Connection;
mongoose.Promise = global.Promise;
const db = mongoose.connection;

//routes
require('./routes/routes.js')(app)


const server = http.createServer(app)
const io     = socketIO(server)

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 500);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  VisitSchema.find({}, (err, visits) => {
      if(err) {
          console.log(err)
      } else {
        socket.emit("FromAPI", visits);
      }
  })
};

const port = process.env.PORT || 5000;

server.listen(port, () => console.log('App is listening on port ' + port));

