// ==============================================================
// CONTROLLER CONFIGURATION
// ==============================================================
const express = require('express')
const ROUTER = express.Router()
const Item = require('../models/item_model.js')
const Section = require('../models/section_model.js')
const middleware = require('../services/middleware.js')

// ==============================================================
// ROUTES
// ==============================================================

// add new item
ROUTER.get('/new/:id', middleware.isAuthenticated, async (req, res) => {
    let sectionID = req.params.id
    let sectionObject = await Section.findById(sectionID, (error, foundSection) => {return foundSection})
    let userSectionObjects = await Section.find({user: req.session.currentUser}, (error, userSections) => {return userSections})

    res.render('items/new.ejs', {
        section: sectionObject
        ,userSections: userSectionObjects
    })
})

// create new item
ROUTER.post('/:id', async (req, res) => {
    let itemObject = await middleware.appFunctions.createItemInSection(req.params.id)
    console.log(itemObject)
    await middleware.appFunctions.addItemToUser(itemObject)
    await middleware.appFunctions.addItemToSection(itemObject)

    res.redirect('../' + req.params.id)
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
