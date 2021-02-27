// ==============================================================
// CONTROLLER CONFIGURATION
// ==============================================================
const bcrypt = require('bcrypt')
const express = require('express')
const ROUTER = express.Router()
const User = require('../models/user_model.js')

// ==============================================================
// ROUTES
// ==============================================================

// add new user
ROUTER.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// create new user
ROUTER.post('/', (req, res) => {
    // create a new object with the user input (hash the password) and pass that to the database
    console.log('Received a user creation request')
    console.log(req.body.password)
    let newUser = {
        email: req.body.email
        ,password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }

    User.create(newUser, (err, createdUser) => {
        console.log('user is created', createdUser)
        res.redirect('/resumes')
    })
})

// edit user
ROUTER.get('/:id/edit', (req, res) => {
    res.send('Testing edit user route')
})

// update user
ROUTER.put('/:id', (req, res) => {
    console.log('Received an user update request')
})

// delete user
ROUTER.delete('/:id', (req, res) => {
    console.log('Received an user delete request')
})

// ==============================================================
// EXPORTER
// ==============================================================
module.exports = ROUTER
