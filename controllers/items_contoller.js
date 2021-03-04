// ==============================================================
// CONTROLLER CONFIGURATION
// ==============================================================
const express = require('express')
const ROUTER = express.Router()
const Item = require('../models/item_model.js')
const Section = require('../models/section_model.js')
const middleware = require('../services/middleware.js')
const QueryString = require('query-string')

// ==============================================================
// ROUTES
// ==============================================================

// add new item
ROUTER.get('/new/:id', middleware.isAuthenticated, async (req, res) => {
    let sectionID = req.params.id
    console.log('Section ID: ', sectionID)
    let sectionObject = await Section.findById(sectionID, (error, foundSection) => {return foundSection})
    // console.log('Section ID for finding section object: ', sectionID)
    // console.log('Section for creating new item: ', sectionObject)
    let userSectionObjects = await Section.find({user: req.session.currentUser}, (error, userSections) => {return userSections})
    console.log('User sections for Nav: ', userSectionObjects)

    res.render('items/new.ejs', {
        section: sectionObject
        ,userSections: userSectionObjects
    })
})

// create new item
ROUTER.post('/', (req, res) => {
    Item.create(req.body, (error, createdItem) => {
        res.redirect('back')
    })
})

// show item
ROUTER.get('/item/:id', (req, res) => {
    Item.findById(req.params.id, (error, foundItem) => {
        res.render('items/show.ejs', {
            item: foundItem
        })
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
ROUTER.delete('/item/:id', middleware.isAuthenticated, (req, res) => {
    console.log('Received an item delete request')
    let sectionID = ""
    Item.findById(req.params.id, async (error, foundItem) => {
        sectionID = foundItem.section
        await middleware.appFunctions.removeItemFromUser(foundItem)
        await middleware.appFunctions.removeItemFromSection(foundItem)
    })
    Item.findByIdAndDelete(req.params.id, { useFindAndModify: false}, (error, data) => {
        res.redirect('../')
    })
})

// ==============================================================
// EXPORTER
// ==============================================================
module.exports = ROUTER
