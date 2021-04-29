const express = require("express");
const router = express.Router();
const Feedback = require("../../models/feedback")
router.get("/", async (req, res) => {
    try {
        const feedback = await Feedback.find()
        // console.log(feedback)
        res.json(feedback)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

router.get("/users/:userId", async (req, res) => {
    try {
        const user = req.params["userId"]
        const feedback = await Feedback.find({userId:user}).sort({"createdAt":-1})
        // console.log(feedback)
        res.send(feedback)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

router.get("/:trainerId", async (req, res) => {
    try {
        const trainer = req.params['trainerId'];
        const feedback = await Feedback.find({trainerId:trainer}).sort({"createdAt":-1})
        res.send(feedback)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})
router.get("/:trainerId/:feedbackId", async (req, res) => {
    try {
        const fId = req.params['feedbackId'];
        const feedback = await Feedback.find({_id:fId})
        res.send(feedback)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})
router.delete("/:trainerId/:feedbackId", async (req, res) => {
    try {
        const fId = req.params['feedbackId'];
        const feedback = await Feedback.remove({_id:fId})
        res.send(feedback)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

router.post("/:trainerId", async (req, res) => {
    try {
//         console.log(req.body)
//         // const trainer = req.params['trainerId']
        res.json(await Feedback.create(req.body))
        // const feedback = await new Feedback(req.body)
        // console.log("feedback",req.body)
        // const feedback = await new Feedback
        // ({
        //     trainerId: trainer,
        //     // userId: traineeId,
        //     feedbackText: req.body.post,
        //
        // })
        // await feedback.save()
        // res.json(feedback)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})
module.exports = router;