let mongoose        = require("mongoose");
let Schema          = mongoose.Schema;

var VisitSchema = new Schema({
    website: String,
    visit: Number,
    name: String
});

module.exports = mongoose.model("Visit", VisitSchema,"visit");