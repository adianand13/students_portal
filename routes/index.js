var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    passport    = require("passport");
    User        = require("../models/users");


    router.get("/",function (req,res) {
    res.render("landing");
});
router.get("/example",isLoggedIn,function (req,res) {
    res.render("example");
});


router.get("/login",function (req,res) {
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/checkUser",
    failureRedirect: "/login"
}), function (req,res) {});

router.get("/checkUser",isLoggedIn, function (req,res) {
    if (req.user.isAdmin){
        // res.send("hey Admin");
        res.redirect("/admin");
    }else {
        res.send("hey normal user");
        // res.render("Dashboard");
    }
});

function isLoggedIn(req ,res ,next){
    if (req.isAuthenticated()){
        return next()
    }else {
        res.redirect("/login");
    }
}

module.exports = router;