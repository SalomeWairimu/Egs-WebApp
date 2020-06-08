var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/", function(req, res) {
    User.find({}, function(err, allUsers){
      if(err){
          return res.json({ success: false, error: err });
      } else {
          var years = new Set();
          for (var i = 0; i < allUsers.length; i++)
          {
              years.add(allUsers[i].grad_year);
          }
		  return res.json({ success: true, data: allUsers });
      }
    });
});

// SHOW - shows more info about one user
router.get("/:id",function(req, res){
    //find the user with provided ID
    console.log(req.params.id);
    User.findById(req.params.id).populate("posts").exec(function(err, foundUser){
        if(err){
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true, data: foundUser });
        }
    });
});

module.exports = router;