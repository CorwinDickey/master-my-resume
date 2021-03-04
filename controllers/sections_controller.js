// ==============================================================
// CONTROLLER CONFIGURATION
// ==============================================================
const express = require('express')
const ROUTER = express.Router()
const Section = require('../models/section_model.js')
const Item = require('../models/item_model.js')

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
    let section = await Section.findById(req.params.id, (error, foundSection) => {return foundSection})
    let sectionItems = await Item.find(
        {user: req.session.currentUser, section: section.id}
        ,(error, sectionItems) => {return sectionItems}
    )
    let userSections = await Section.find({user: req.session.currentUser}, (error, userSections) => {return userSections})
    
    res.render('section.ejs', {
        currentUser: req.session.currentUser
        ,section: section
        ,sectionItems: sectionItems
        ,userSections: userSections
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
