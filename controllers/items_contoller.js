// ==============================================================
// CONTROLLER CONFIGURATION
// ==============================================================
const express = require('express')
const ROUTER = express.Router()
const Item = require('../models/item_model.js')
const UserServices = require('../services/app_services.js')

// ==============================================================
// ROUTES
// ==============================================================

// add new item
ROUTER.get('/new', (req, res) => {
    res.send('Testing new item route')
})

// create new item
ROUTER.post('/', (req, res) => {
    // create item
})

// show item
ROUTER.get('/:id', (req, res) => {
    
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
    Item.findById(req.params.id, async (error, foundItem) => {
        await UserServices.removeItemFromUser(foundItem)
        await UserServices.removeItemFromSection(foundItem)
    })
    Item.findByIdAndDelete(req.params.id, { useFindAndModify: false}, (error, data) => {
        res.redirect('back')
    })
})

// ==============================================================
// EXPORTER
// ==============================================================
module.exports = ROUTER
