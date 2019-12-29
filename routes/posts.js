var express = require("express");
var router  = express.Router();
var Post = require("../models/post");
var User = require("../models/user");
var middleware = require("../middleware");
var moment = require('moment');

// add middleware
// posts routes
router.get("/", middleware.isLoggedIn, function(req, res) {
        // Get all posts from DB
    Post.find({}, function(err, allPosts){
      if(err){
          console.log(err);
      } else {
          res.render("posts/index",{posts:allPosts});
      }
    });
});
//CREATE - add new post to DB
router.post("/", middleware.isLoggedIn,function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err){
           console.log(err);
           res.redirect("/posts");
       } else {
            // get data from form and add to posts array
            var author = {id: req.user._id, firstname:req.user.firstname, lastname: req.user.lastname};
            var title = req.sanitize(req.body.title);
            var body = req.sanitize(req.body.body);
            var newPost = {author: author,title: title, body: body};
            // Create a new post and save to DB
            Post.create(newPost, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    user.posts.push(newlyCreated);
                    user.save();
                    //redirect back to posts page
                    res.redirect("/posts");
                }
            });
       }
    });
});
// //NEW - show form to create new post
// router.get("/new", middleware.isLoggedIn,function(req, res){
//   res.render("posts/new"); 
// });

// SHOW - shows more info about one post
router.get("/:id", middleware.isLoggedIn,function(req, res){
    //find the post with provided ID
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            //render show template with that post
            res.render("posts/show", {post: foundPost});
        }
    });
});

// edit posts
// router.get("/:id/edit", middleware.checkPostOwnership,function(req, res) {
//     Post.findById(req.params.id, function(err, foundpost)
//     {
//         if (err)
//         {
//             res.redirect("/posts");
//         }
//         else
//         {
//             res.render("posts/edit", {post: foundpost});
//         }
//     });
// });

// update
router.put("/:id", middleware.checkPostOwnership, function(req,res)
{
    var title = req.sanitize(req.body.title);
    var body = req.sanitize(req.body.body);
    var updatedPost = {title: title, body:body};
    Post.findOneAndUpdate({_id:req.params.id}, {$set: updatedPost}, function(err)
    {
        if (err)
        {
            res.redirect("/posts");
        }
        else
        {
            res.redirect("/posts/"+req.params.id);
        }
    });
});
//delete
router.delete("/:id", middleware.checkPostOwnership, function(req,res)
{
    Post.findOneAndDelete({_id:req.params.id}, function(err)
    {
        if (err)
        {
            res.redirect("/posts");
        }
        else
        {
            res.redirect("/posts");
        }
    });
});

module.exports = router;