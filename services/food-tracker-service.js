const foodTrackerModel = require("../models/food-tracker")

const createQuiz = () => {}

const findAllFoodEntries = () => {
    return foodTrackerModel.find()
}

const findFoodEntryById = (fid) => {
    return foodTrackerModel
        .findById(fid)
}

const updateQuiz = () => {}
const deleteQuiz = () => {}

module.exports = {
    createQuiz,
    findAllFoodEntries,
    findFoodEntryById,
    updateQuiz,
    deleteQuiz
}