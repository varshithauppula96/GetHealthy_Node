const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:Date
    },
    weightInKgs:{
        type:Number
    },
    heightInCms:{
        type:Number
    },
    userType:{
        type: String,
        required: true
    },
    trainerId:{
        type:String,

    },
    about:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    }

});
module.exports = User = mongoose.model("users", UserSchema);
