const foodTrackerService = require("../services/food-tracker-service")

module.exports = (app) => {
    const findAllFoodEntries = (req, res) => {
        res.send(foodTrackerService.findAllFoodEntries())
    }

    const findFoodEntryById = (req, res) => {
        const foodId = req.params['fid']
        res.send(findAllFoodEntries.findFoodEntryById(foodId))
    }

    app.get("/api/foodEntries", findAllFoodEntries)
    app.get("/api/foodEntries/:fid", findFoodEntryById)
}
