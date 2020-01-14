var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    school: String,
    grad_year: Number,
    major: String,
    password: String,
	profile_url: String,
    posts: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post"
      }
    ],
    internships: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Internship"
      }
    ],
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);