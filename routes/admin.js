var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    passport    = require("passport"),
    moment      = require("moment"),
    User        = require("../models/users"),
    College     = require("../models/college");

const { convertCSVToArray } = require('convert-csv-to-array');
const { check, validationResult } = require('express-validator/check');

    router.get("/admin", function (req,res) {
        res.render("./admin/dashboard",{page:page});
    });

    router.get("/department",function (req,res) {
        // res.render("./department/department");
    });


    router.get("/newDepartment",function (req,res) {
        res.render("./department/newDepartment");
    });
    
    router.get("/downloads/newUsersCSV",function (req,res) {
        res.download("./public/file/newUsers.csv", "newUsers.csv",function (err) {
            if (err){
                console.log(err);
            } else{
                console.log("Successfully downloaded");
            }
        } )
    });
    router.get("/faculties",function (req,res) {
        User.find({"userType" : "faculty"},function (err,allFaculties) {
            if (err){
                console.log(err);
            }
            page.body=allFaculties;
        });
        res.render("./user/allFaculty",{page:page});
        // res.send(page.body);
    });


    router.get("/newFaculty",function (req,res) {
        res.render("./user/newFaculty");
    });
    //to create new faculty
    router.post("/newFaculty",function (req,res) {
        //getting data inputted by user
        var rawData = req.body.data;
        rawData.trim();
        var data = convertCSVToArray(rawData,{
            header: false,
            type: 'object',
            separator: ',',
        });
        //slicing the header
        data = data.slice(1);
        //trimming every value
        var users = JSON.parse(JSON.stringify(data),function(key,value){
            if(typeof value === 'string'){
                return value.trim();
            }
            return value;
        });
        //arrays to store successfully created account and not successfully created account
        var sucessarrays = [];
        var errorarrays = [];
        //creating new account for all users
        for(let i=0; i<users.length; i++) {
            //first password = username
            var password = JSON.stringify(users[i].username);
            User.register(users[i], password, function (err, user) {
                if (err) {
                    console.log(err);
                    errorarrays.push(users[i]);
                }else{
                    sucessarrays.push(user);
                    // console.log(JSON.stringify(sucessarrays));
                }
                User.findOneAndUpdate({_id: user._id},{$set:{userType: "faculty"}},{new: true}, function(err, doc){
                    if (err) {
                        console.log("Something wrong when updating data!"+err);
                    }
                    console.log(doc);
                });
            });
        }
        res.redirect("/faculties");
    });

//to render create college page
    router.get("/createCollege",function (req,res) {
        res.render("./college/createCollege");
    });
    //to add new college to database
    router.post("/createCollege",isAdmin, [
            check('college.name').isLength({ min: 5 }),
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
                    res.redirect("/colleges");
                }
            })
    });

//To display all the colleges
    router.get("/colleges",function (req,res) {
        College.find({},function (err,allColleges) {
            if (err){
                console.log(err);
            } else {
                page.body=allColleges;
                // allColleges.forEach(function (col) {
                //     console.log(col.address);
                // });
                // res.(allColleges);
                res.render("./department/department",{page:page});
                // res.render("./college/colleges",{page:page});
            }
        });

    });

function isAdmin(req ,res ,next){
    if (req.isAuthenticated()){//if logged in
        if (req.user.isAdmin){ //if admin
            return next();  //move to next function
        }else {     //else send to dashboard of the user
            // res.render("/dashboard");
            res.send("not admin");
        }
    }else {
        res.redirect("/login"); //if not logged in then send to the login page
    }
}

page={
    header:{
        title : "Student's Portal - Admin"
    },
    sideNav:[
        {title:"Dashboard", url:"/", class_:"ni ni-tv-2 text-primary"},
        {title:"Departments", url:"/Department", class_:"ni ni-books text-blue"},
        {title:"Messages", url:"/", class_:"ni ni-chat-round text-orange"},
        {title:"My Profile", url:"/", class_:"ni ni-single-02"},
        {title:"Logs", url:"/", class_:"ni ni-single-02 text-yellow"},
        {title:"Users", url:"/", class_:"ni ni-bullet-list-67 text-red"},
        {title:"Edit", url:"/", class_:"ni ni-vector text-info"},
        {title:"Settings", url:"/", class_:"ni ni-settings text-pink"}
    ],
    stat_card:[
        {title:"colleges / Department",value1:"",color1:"bg-danger",icon:"fas fa-building",value2:"+1",color2:"text-success",description:"Create new", url:"/Department"},
        {title:"Users",value1:"23546",color1:"bg-yellow",icon:"fas fa-users",value2:"+1",color2:"text-danger",description:"Create new", url:"/newFaculty"},
        {title:"Server Load",value1:"21%",color1:"bg-warning",icon:"fas fa-building",value2:"Up",color2:"text-primary",description:"know more", url:"/"},
        {title:"File Storage",value1:"29%",color1:"bg-info",icon:"fas fa-folder-open",value2:"Up",color2:"text-default",description:"see all files", url:"/"}
    ],
    body:{}
};
header={
    title : "Student's Portal - Admin"
};

module.exports = router;