var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var Internship = require("../models/internship");
var middleware = require("../middleware");

// posts routes
router.get("/", middleware.isLoggedIn, function(req, res) {
        // Get all posts from DB
    Internship.find({}, function(err, allInternships){
      if(err){
          return res.json({ success: false, error: err });
      } else {
		  return res.json({ success: true, data: allInternships});
      }
    });
});

//CREATE - add new post to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err){
           return res.json({ success: false, error: err });
       } else {
            // get data from form and add to posts array
            var author = {id: req.user._id, firstname:req.user.firstname, lastname: req.user.lastname};
            var type = req.sanitize(req.body.type);
            var company = req.sanitize(req.body.company);
            var position = req.sanitize(req.body.position);
            var startdate = req.body.startdate;
            var enddate = req.body.enddate;
            var review = req.sanitize(req.body.review);
            var advice = req.sanitize(req.body.advice);
            var contact = req.sanitize(req.body.contact);

            var newIntenship = {author: author, type: type, company: company, position: position, startdate: startdate, enddate: enddate, review: review, advice: advice, contact:contact};
            // Create a new post and save to DB
            Internship.create(newIntenship, function(err, newlyCreated){
                if(err){
                    return res.json({ success: false, error: err });
                } else {
                    user.internships.push(newlyCreated);
                    user.save();
                    return res.json({ success: true, data: newlyCreated });
                }
            });
       }
    });
});
//NEW - show form to create new post
// router.get("/new", middleware.isLoggedIn,function(req, res){
//   res.render("internships/new"); 
// });

// SHOW - shows more info about one post
router.get("/:id", middleware.isLoggedIn,function(req, res){
    //find the post with provided ID
    Internship.findById(req.params.id).populate("comments").exec(function(err, foundInternship){
        if(err){
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true, data: foundInternship });
        }
    });
});

// edit posts
router.get("/:id/edit", middleware.checkInternshipOwnership, function(req, res) {
    Internship.findById(req.params.id, function(err, foundinternship)
    {
        if (err)
        {
            return res.json({ success: false, error: err });
        }
        else
        {
			return res.json({ success: true, data: foundinternship });
        }
    });
});
// update
router.put("/:id", middleware.checkInternshipOwnership, function(req,res)
{
    var author = {id: req.user._id, firstname:req.user.firstname, lastname: req.user.lastname};
    var type = req.sanitize(req.body.type);
    var company = req.sanitize(req.body.company);
    var position = req.sanitize(req.body.position);
    var startdate = req.body.startdate;
    var enddate = req.body.enddate;
    var review = req.sanitize(req.body.review);
    var advice = req.sanitize(req.body.advice);
    var contact = req.sanitize(req.body.contact);

    var updatedIntenship = {author: author, type: type, company: company, position: position, startdate: startdate, enddate: enddate, review: review, advice: advice, contact:contact};
    Internship.findOneAndUpdate({_id:req.params.id}, {$set: updatedIntenship}, function(err)
    {
        if (err)
        {
            return res.json({ success: false, error: err });
        }
        else
        {
            return res.json({ success: true, data: updatedIntenship });
        }
    });
});
//delete
router.delete("/:id", middleware.checkInternshipOwnership, function(req,res)
{
    Internship.findOneAndDelete({_id:req.params.id}, function(err)
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