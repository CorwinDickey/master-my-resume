const mongoose = require('mongoose')

const sectionSchema = mongoose.Schema({
    name: String
    ,type: String
    ,items: Array
    ,deletable: Boolean
})

const Section = mongoose.model('Section', sectionSchema)

module.exports = Section