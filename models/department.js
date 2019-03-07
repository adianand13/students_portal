var mongoose = require('mongoose');

var DepartmentSchema = new mongoose.Schema({
    name: { type : String , unique : true},
    code:{ type : String , unique : true},
    college: String,
    Semester: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Semester"
        }
    ],
    Faculty: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Faculty"
        }
    ],
    principal: {
        type: mongoose.Schema.ObjectId,
        ref: "Faculty"
    },
    organiser:{
        type: mongoose.Schema.ObjectId,
        ref: "Faculty"
    }
});

module.exports = mongoose.model("Department", DepartmentSchema);