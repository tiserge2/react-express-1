const express       = require('express');
const path          = require('path');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');

const app           = express();
const configDB      = require('./config/database')

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

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


const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);