var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var PostSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        firstname: String,
        lastname: String
    },
    // userId: String,
    // userFname: String,
    // userLname: String,
    time: {
        type: Date,
        default: Date.now
},
    title: String,
    body: String,
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
    ]
});

module.exports = mongoose.model("Post", PostSchema);