var Post = require("../models/post");
var Comment = require("../models/comment");
var Internship = require("../models/internship");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err || !foundComment){
               req.flash('error', 'Sorry, that comment does not exist!');
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkInternshipOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Internship.findById(req.params.id, function(err, foundInternship){
           if(err || !foundInternship){
               req.flash('error', 'Sorry, that internship does not exist!');
               res.redirect("back");
           }  else {
               // does user own the post?
            if(foundInternship.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkPostOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Post.findById(req.params.id, function(err, foundPost){
           if(err || !foundPost){
               req.flash('error', 'Sorry, that post does not exist!');
               res.redirect("back");
           }  else {
               // does user own the post?
            if(foundPost.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next)
{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/");
};

module.exports = middlewareObj;
