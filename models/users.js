var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var users = ["student","faculty","admin","organiser","principal"];
var bloodGroups =["A+","A-","B+","B-","AB+","AB-","O+","O-"];
/*  PHC - Physically Challenged,
    FF : Freedom Fighters,
    BC-A : Backward caste group A, BC-B: Backward caste group B
    ESM : Ex-Serviceman
    ST : Scheduled Tribe
    SC : Scheduled Caste
    OBC : Other backward caste
 */
var Category =["ST","SC","OBC","BC-A","BC-B","ESM","PHC","General","FF"];
var Religion =["Hinduism","Islam", "Christianity","sikhism","Jainism","Zoroastrianism", "Atheist", "Others"];

var UserSchema = new mongoose.Schema({
    username: { type : String , unique : true},
    password: String,
    userType: { type: String, enum: users, default:"student"},
    Name: String,
    emailAddress: [String],
    DOB: Date,
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    bloodGroup: {
        type: String,
        enum: bloodGroups
    },
    address: [{
        house: String,
        street: String,
        city: String,
        state: String,
        areaCode: Number,
        country: String
    }],
    photo: String,
    contact1: Number,
    contact2: Number,
    country: String,
    father: {
        name: String,
        contact1: Number,
        contact2: Number,
        income: Number,
        occupation : String
    },
    mother: {
        name: String,
        contact1: Number,
        contact2: Number,
        income: Number,
        occupation : String
    },
    familyIncome: Number,
    religion: {
        type: String,
        enum: Religion
    },
    category:{
        type: String,
        enum: Category
    },
    aadhaar: String,
    isStudent: {
        Group: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'group'
        },
        Semester: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'semester'
        },
        Course: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'course'
        },
        Department: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'group'
        },
        isInternational:{
            passport:{
                Number: String,
                expiry: Date,
            },
            visa:{
                Number: String,
                expiry: Date,
            }
        }
    },
    isFaculty:{
        subjects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject'
        }],
        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  'group'
        },
        headMentor:{
            type: mongoose.Schema.Types.ObjectId,
            ref:  'semester'
        },
        isPrincipal:{
            type: mongoose.Schema.Types.ObjectId,
            ref:  'Department'
        },
        isOrganiser:{
            type: mongoose.Schema.Types.ObjectId,
            ref:  'Department'
        },
        Department: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'group'
        },
    },
    isAdmin: Boolean
},{timestamps: true});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);