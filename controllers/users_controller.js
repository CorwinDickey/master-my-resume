// ==============================================================
// CONTROLLER CONFIGURATION
// ==============================================================
const express = require('express')
const ROUTER = express.Router()
const User = require('../models/user_model.js')

// ==============================================================
// ROUTES
// ==============================================================

// add new user
ROUTER.get('/new', (req, res) => {
    res.send('Testing new user route')
})

// create new user
ROUTER.post('/', (req, res) => {
    console.log('Received an user creation request')
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
