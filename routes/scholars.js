var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/", middleware.isLoggedIn, function(req, res) {
    User.find({}, function(err, allUsers){
      if(err){
          console.log(err);
      } else {
          var years = new Set();
          for (var i = 0; i < allUsers.length; i++)
          {
              years.add(allUsers[i].grad_year);
          }
          res.render("scholars/index",{scholars:allUsers, years:years});
      }
    });
});

// SHOW - shows more info about one user
router.get("/:id", middleware.isLoggedIn,function(req, res){
    //find the user with provided ID
    console.log(req.params.id);
    User.findById(req.params.id).populate("posts").exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            //render show template with that post
            res.render("scholars/show", {scholar: foundUser});
        }
    });
});

module.exports = router;