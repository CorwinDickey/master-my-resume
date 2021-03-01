const mongoose = require('mongoose')

const sectionSchema = mongoose.Schema({
    name: String
    ,type: String
    ,items: {type: Array, default: []}
    ,deletable: {type: Boolean, default: true}
    ,owner: {type: mongoose.Schema.Types.ObjectID, required: true}
})

const Section = mongoose.model('Section', sectionSchema)

module.exports = Section