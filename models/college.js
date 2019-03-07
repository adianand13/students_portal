var mongoose = require('mongoose');

var CollegeSchema = new mongoose.Schema({
    name: { type : String, unique : true},
    code: { type: String, unique: true },
    description: String,
    address: {
        add: String,
        city: String,
        state: String,
        areaCode: Number,
        country: {type:String, default:"India"}
    },
    Department: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Department"
        }
    ]
});

module.exports = mongoose.model("College", CollegeSchema);