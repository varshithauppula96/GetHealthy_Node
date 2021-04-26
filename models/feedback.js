const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FeedbackSchema = new mongoose.Schema({
    feedbackText: String,
    userId:{
        type: String,
        ref:"users",
    },
    nameOfUser:{
        type: String,
        ref:"users"
    },
    trainerId:{
        type: String,
        ref:"users"
    }
}, {timestamps: true});
module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);