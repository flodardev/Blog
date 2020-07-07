const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
let User = require("../models/User")

// bcrypt
const saltRounds = 10;

router.post("/register", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    // Hash the password
    bcrypt.hash(password, saltRounds)
        .then(hash => {
            const newUser = new User({
                username: username,
                password: hash
            })
        
            // Save in database
            newUser.save()
                .then(() => res.json("User added."))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check in database if user exists
    User.findOne({username: username})
        .then(user => {
            // Compare password
            bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        // Create a token
                        const token = jwt.sign({
                            _id: user._id
                        }, process.env.TOKEN_SECRET)

                        // Send the token
                        res.header("auth-token", token).send(token)
                    } else {
                        res.status(401).json("Username or Password invalid.")
                    }
                })
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(401).json("Error: " + err))
})

module.exports = router;