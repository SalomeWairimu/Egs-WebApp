var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var CommentSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        firstname: String,
        lastname: String
    },
    post: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        title: String,
    },
    time: {
        type: Date,
        default: Date.now
    },
    body: String,
});

module.exports = mongoose.model("Comment", CommentSchema);