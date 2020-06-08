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
          return res.json({ success: false, error: err });
      } else {
		  return res.json({ success: true, data: allPosts});
      }
    });
});
//CREATE - add new post to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	console.log(req);
    User.findById(req.user._id, function(err, user){
        if(err){
           return res.json({ success: false, error: err });
       } else {
            // get data from form and add to posts array
            var author = {id: user._id, firstname:user.firstname, lastname: user.lastname};
            var title = req.sanitize(req.body.title);
            var body = req.sanitize(req.body.body);
            var newPost = {author: author,title: title, body: body};
            // Create a new post and save to DB
            Post.create(newPost, function(err, newlyCreated){
                if(err){
                    return res.json({ success: false, error: err });
                } else {
                    user.posts.push(newlyCreated);
                    user.save();
                    return res.json({ success: true, data: newlyCreated });
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
router.get("/:id", middleware.isLoggedIn, function(req, res){
    //find the post with provided ID
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            return res.json({ success: false, error: err });
        } else {
			return res.json({ success: true, data: foundPost });
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
            return res.json({ success: false, error: err });
        }
        else
        {
            return res.json({ success: true, data: updatedPost });
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
            return res.json({ success: false, error: err });
        }
        else
        {
            return res.json({ success: true});
        }
    });
});

module.exports = router;