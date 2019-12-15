var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/", function(req,res)
{
    res.render("landing");
});

// register routes
// router.get("/register", function(req, res) {
//     res.render("register");
// });
router.post("/register", function(req,res)
{
    var userObj = {
        firstname: req.sanitize(req.body.firstname), 
        lastname: req.sanitize(req.body.lastname), 
        username: req.sanitize(req.body.username),
        school: req.sanitize(req.body.school),
        grad_year: req.sanitize(req.body.grad_year),
        major: req.sanitize(req.body.major)
    };
    User.register(new User(userObj), req.body.password, function(err, user)
    {
        if (err)
        {
            req.flash("error", err.message);
            return res.redirect("/");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Egs Website " + user.firstname);
            res.redirect("/about");
        });
    });
});

// login routes
// router.get("/login", function(req, res) {
//     res.render("login");
// });
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/about",
    failureRedirect: "/"
}), function(req, res)
{
    
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

//homepage
router.get("/about", middleware.isLoggedIn, function(req, res) {
    res.render("about");
});


module.exports = router;