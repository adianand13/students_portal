// Import User Scehma and Passport
const User=require("./models/users");
const passport=require("passport");
const LocalStrategy = require("passport-local");

//Create a new User obj
const newAdmin = new User({username: "admin",Name: "Aditya", isAdmin: true, userType: "admin"});

function seedDB(){
    //find for admin
    User.findOne({isAdmin: true},function (err, admin) {
        //if error
        if (err){
            console.log(err);
        } else{
            //if found
            if(admin){
                console.log("Admin found" + JSON.stringify(admin));
            }else{
                //if not found
                console.log("create admin ");
                User.register(newAdmin, "secret",function (err, user) {
                    if (err){
                        console.log(err);
                    }else{
                        console.log(user);
                    }
                });
            }
        }
    });
}

module.exports = seedDB;