var express = require("express");
var router  = express.Router({mergeParams: true});
var Post = require("../models/post");
var User = require("../models/user");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup post using ID
   Post.findById(req.params.id, function(err, foundPost){
       if(err){
           return res.json({ success: false, error: err });
       } else {
           var author = {id: req.user._id, firstname: req.user.firstname, lastname: req.user.lastname};
           var post = {id: foundPost._id, title: foundPost.title};
           var newComment = {author: author, post: post, body: req.sanitize(req.body.body)};
        Comment.create(newComment, function(err, comment){
           if(err){
               return res.json({ success: false, error: err });
           } else {
               foundPost.comments.push(comment);
               foundPost.save();
               return res.json({ success: true, data: comment });
           }
        });
       }
   });
});

//delete
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res)
{
    Comment.findOneAndDelete({_id:req.params.comment_id}, function(err)
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