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
    Section.create(req.body, (error, createdSection) => {})
})

ROUTER.get('/:id', (req, res) => {
    Section.findById(req.param.id, (error, foundSection) => {
        res.send(foundSection.name)
    })
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
