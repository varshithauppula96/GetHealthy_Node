const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodTrackerSchema = new mongoose.Schema({
    foodId: {
        type:String,
    },
    label: {
        type: String,
    },
    userId: {
        type: String,
    },
    weight: {
        type: Number,
    },
    calories: {
        type: Number,
    },
    protein: {
        type: Number,
    },
    fat: {
        type: Number,
    },
    carbohydrates: {
        type: Number,
    },
}, {timestamps: true});

module.exports = FoodTracker = mongoose.model("foodTracker", FoodTrackerSchema);