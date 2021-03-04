const bcrypt = require('bcrypt')
const express = require('express')
const ROUTER = express.Router()
const User = require('../models/user_model.js')
const Section = require('../models/section_model.js')

ROUTER.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})

ROUTER.post('/', (req, res) => {
    // username is found and password matches
    // successful log in

    // username is not found - who cares about password if you don't have a username that is found?
    // unsuccessful login

    // username found but password doesn't match
    // unsuccessful login

    // some weird thing happened???

    // Step 1, look for the username
    User.findOne({username: req.body.username}, async (err, foundUser) => {
        // Database error
        // console.log(foundUser)
        if (err) {
            console.log(err)
            res.send('oops, the db had a problem')
        } else if (!foundUser) {
            // if found user is undefined/null/not found etc
            res.send('<a href="/">invalid username</a>')
        } else {
            // user is found
            // now let's check if passwords match
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                // add hte user to our current session
                req.session.currentUser = foundUser
                let sectionObject = await Section.findOne({ user: foundUser.id, name: 'Resumes'})
                res.redirect('/section/' + sectionObject.id)
            } else {
                // passwords do not match
                res.send('<a href="/">invalid password</a>')
            }
        }
    })
})

module.exports = ROUTER