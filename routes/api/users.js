const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
// @route POST api/users/register
// @desc Register user
// @access Public
router.get("/", async (req, res) => {
    try {
        const users = await User.find()

        res.json(users)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

router.get("/:trainer", async (req, res) => {
    try {
        const trainer = await User.find({userType : "Trainer"})
        res.send(trainer)


    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params['userId'];
        const user = await User.findById(userId)

        res.send(user)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gender:req.body.gender,
                dateOfBirth:req.body.dateOfBirth,
                weightInKgs:req.body.weightInKgs,
                heightInCms:req.body.heightInCms,
                userType:req.body.userType,
                trainer:req.body.trainer,
                about:req.body.about
            });
// Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
// Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    email:user.email,
                    gender:user.gender,
                    dateOfBirth:user.dateOfBirth,
                    weightInKgs:user.weightInKgs,
                    heightInCms:user.heightInCms,
                    userType:user.userType,
                    trainer:user.trainer,
                    about:user.about
                };
// Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});
module.exports = router;