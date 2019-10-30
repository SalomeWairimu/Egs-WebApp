var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    flash  = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession = require("express-session"),
    User = require("./models/user"),
    Post = require("./models/post"),
    Comment = require("./models/comment"),
    Internship = require("./models/internship");

// requiring routes
var indexRoutes = require("./routes/index");
var postRoutes    = require("./routes/posts");
var commentRoutes = require("./routes/comments");
var internshipRoutes = require("./routes/internships");


// mongoose.connect("mongodb://localhost:27017/egsdemo",{useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false });
mongoose.connect("mongodb+srv://egs:Egs2019@cluster0-lgdws.mongodb.net/test?retryWrites=true",{
    useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false
    }).then(()=> {
        console.log("connected");
    }).catch(err => {
        console.log(err.message)
    });
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIGURE
app.use(expressSession({
    secret: "Lulu is my plant",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//routes
app.use(indexRoutes);
app.use("/posts", postRoutes);
app.use("/posts/:id/comments",commentRoutes);
app.use("/internships", internshipRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The egs v1 Started!");
});