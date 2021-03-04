// ==============================================================
// CONTROLLER CONFIGURATION
// ==============================================================
const express = require('express')
const ROUTER = express.Router()
const Section = require('../models/section_model.js')

// ==============================================================
// ROUTES
// ==============================================================

// add new section
ROUTER.get('/new', (req, res) => {
    res.send('Testing new item route')
})

// create new section
ROUTER.post('/', (req, res) => {
    Section.create(req.body, (error, createdSection) => {})
})

// show section
ROUTER.get('/:id', async (req, res) => {
    // let sections = req.session.currentUser.sections
    // console.log(sections)
    sectionID = req.params.id
    // console.log(sectionID)
    // console.log('Found section for show route: ', Section.findById(req.params.id, (error, foundSection) => {return foundSection}))
    res.render('section.ejs', {
        currentUser: req.session.currentUser
        ,section: await Section.findById(req.params.id, (error, foundSection) => {return foundSection})
    })
})

// edit section
ROUTER.get('/:id/edit', (req, res) => {
    res.send('Testing edit item route')
})

// update section
ROUTER.put('/:id', (req, res) => {
    console.log('Received an item update request')
})

// delete section
ROUTER.delete('/:id', (req, res) => {
    console.log('Received an item delete request')
})

// ==============================================================
// EXPORTER
// ==============================================================
module.exports = ROUTER
