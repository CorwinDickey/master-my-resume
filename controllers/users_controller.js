// ==============================================================
// CONTROLLER CONFIGURATION
// ==============================================================
const bcrypt = require('bcrypt')
const express = require('express')
const Section = require('../models/section_model.js')
const ROUTER = express.Router()
const User = require('../models/user_model.js')
const UserServices = require('../services/app_services.js')
// const { resolveInclude } = require('ejs')

// ==============================================================
// ROUTES
// ==============================================================

// add new user
ROUTER.get('/new', (req, res) => {
    res.render('users/new.ejs', {currentUser: req.session.currentUser})
})

// create new user
ROUTER.post('/', async (req, res) => {
    // create a new object with the user input (hash the password) and pass that to the database
    console.log('received a user creation request ===================================')
    let userInfo = {
        email: req.body.email
        ,password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }

    // console.log(userInfo)
    let newUserObject = await UserServices.createUser(userInfo)
    req.session.currentUser = newUserObject
    await UserServices.addNewUserSections(newUserObject.id)
    newUserID = newUserObject.id
    let sectionObject = await Section.findOne({ user: newUserID, name: 'Resumes'})

    res.redirect('/section/' + sectionObject.id)
})

// edit user
ROUTER.get('/:id/edit', (req, res) => {
    res.send('Testing edit user route')
})

// update user
ROUTER.put('/:id', (req, res) => {
    console.log('Received a user update request')
})

// delete user
ROUTER.delete('/:id', (req, res) => {
    console.log('Received a user delete request')
    User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
        console.log('Deleting record: ' + req.params.id)
        console.log(deletedUser)
        res.redirect('/new')
    })
})

// ==============================================================
// EXPORTER
// ==============================================================
module.exports = ROUTER
