var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var InternshipSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        firstname: String,
        lastname: String
    },
    type: String,
    company: String,
    position: String,
    startdate: Date,
    enddate: Date,
    review: String,
    advice: String,
    contact: String
});

module.exports = mongoose.model("Internship", InternshipSchema);