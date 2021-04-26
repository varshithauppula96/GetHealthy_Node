const express = require("express");
const router = express.Router();

const FoodTracker = require("../../models/food-tracker")

router.get("/", async (req, res) => {
    try {
        const foodEntries = await FoodTracker.find()

        res.json(foodEntries)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

router.post("/", async (req, res) => {
    try {
        console.log("Body: ",req.body)
        const foodEntry = await new FoodTracker(req.body)
        await  foodEntry.save()
        res.json(foodEntry)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

router.delete("/:foodId", async (req, res) => {
    try {
        const foodId = req.params['foodId'];
        const foodEntry = await FoodTracker.remove({_id:foodId})
        res.send(foodEntry)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router;