const bcrypt = require('bcrypt')
const express = require('express')
const ROUTER = express.Router()
const User = require('../models/user_model.js')
const Section = require('../models/section_model.js')

ROUTER.get('/new', (req, res) => {
    res.render('index.ejs', {currentUser: req.session.currentUser})
})

ROUTER.post('/', (req, res) => {
    User.findOne({email: req.body.email}, async (error, foundUser) => {
        if (error) {
            console.log(error)
            res.send('oops, the db had a problem')
        } else if (!foundUser) {
            res.send('<a href="/">invalid username</a>')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                let sectionObject = await Section.findOne({ user: foundUser.id, name: 'Resumes'})
                res.redirect('/section/' + sectionObject.id)
            } else {
                res.send('<a href="/">invalid password</a>')
            }
        }
    })
})

ROUTER.delete('/' , (req, res) => {
    // when we remove the session. redirect them to the login screen
    req.session.destroy(() => {
        res.redirect('session/new');
    })
})

module.exports = ROUTER