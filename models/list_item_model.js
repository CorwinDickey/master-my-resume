const mongoose = require('mongoose')

const listItemSchema = mongoose.Schema({
    name: String
    ,description: String
    ,values: Array
})

const ListItem = mongoose.model('ListItem', listItemSchema)

module.exports = ListItem