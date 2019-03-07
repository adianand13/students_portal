var express         = require("express"),
    methodOverride  = require("method-override"),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    expressSanitizer= require("express-sanitizer"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    createError     = require('http-errors'),
    path            = require('path'),
    cookieParser    = require('cookie-parser'),
    logger          = require('morgan'),
    seedDB          = require("./seed"),
    flash           = require('connect-flash'),
    expressSanitizer= require("express-sanitizer"),
    multer          = require("multer"),
    file            = require("file-system"),
    fs              = require("fs"),
passportLocalMongoose=require("passport-local-mongoose");

const User=require("./models/users");

//ToDo: incoming connection setup
var port = 3000;
var ip = "localhost";

//ToDo: DBMS connection
mongoose.connect("mongodb://"+ip+"/student_portal");

//ToDo App Configuration
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// app.use(bodyParser.json());

//ToDo passport configuration
app.use(require("express-session")({
    secret: "SoFtWaRe Is EaTiNg ThE WoRlD", // session secret
    resave: false,
    saveUninitialized: false
}));
app.use(expressSanitizer());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

seedDB();

var isAdmin = require("./middleware").isAdmin;

var indexRoutes  = require("./routes/index");
var adminRoutes  = require("./routes/admin");
// var collegeRoutes = require("./routes/college");

app.use(indexRoutes);
app.use(isAdmin,adminRoutes);

app.get("/user",function (req,res) {
    res.render("user");
});

//ToDo Listen: to incoming request on the port
app.listen(port,ip,function () {
    console.log("app started");
});

module.exports = app;