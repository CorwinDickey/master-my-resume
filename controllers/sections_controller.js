// ==============================================================
// CONTROLLER CONFIGURATION
// ==============================================================
const express = require('express')
const ROUTER = express.Router()
const Section = require('../models/section_model.js')

// ==============================================================
// ROUTES
// ==============================================================

// add new item
ROUTER.get('/new', (req, res) => {
    res.send('Testing new item route')
})

// create new item
ROUTER.post('/', (req, res) => {
    console.log('Received an item creation request')
})

// edit item
ROUTER.get('/:id/edit', (req, res) => {
    res.send('Testing edit item route')
})

// update item
ROUTER.put('/:id', (req, res) => {
    console.log('Received an item update request')
})

// delete item
ROUTER.delete('/:id', (req, res) => {
    console.log('Received an item delete request')
})

// ==============================================================
// EXPORTER
// ==============================================================
module.exports = ROUTER
