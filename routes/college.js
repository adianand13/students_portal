var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    passport    = require("passport"),
    moment      = require("moment"),
    User        = require("../models/users"),
    College     = require("../models/college");

const { convertCSVToArray } = require('convert-csv-to-array');
const { check, validationResult } = require('express-validator/check');

    //To display all the colleges
    router.get("/",function (req,res) {
        College.find({},function (err,allColleges) {
            if (err){
                console.log(err);
            } else {
                page.body=allColleges;
                // res.(allColleges);
                page.body=allColleges;
                res.render("./college/colleges",{page:page});
            }
        });

    });

    //To create new college
    router.get("/create",function (req,res) {
        res.render("./college/createCollege");
    });

    //to add new college to database
    router.post("/create", [
        check('college.name').isLength({ min: 2 }),
        check('college.code').isLength({ min: 2 }),
    ], function (req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        console.log("Success created college" + JSON.stringify(req.body.college) );
        req.body.description= req.sanitize(req.body.description);
        var newCollege = req.body.college;
        newCollege.name.toUpperCase().trim();
        newCollege.code.toUpperCase().trim();
        console.log("Department Creation: " + (newCollege));
        College.create(newCollege, function (err, college) {
            if(err){
                console.log(err);
                return res.render("error", {message:"Error in Register" ,error: err});
            }
            else {
                req.flash("success", "College Created: " + college.name);
                res.redirect("/college");
            }
        })
    });
