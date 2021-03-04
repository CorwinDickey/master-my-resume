const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectID, required: true}
    ,deletable: {type: Boolean, default: true}
    ,name: String
    ,itemType: String
    ,items: {type: [mongoose.Schema.Types.ObjectID]}
})

const Section = mongoose.model('Section', sectionSchema)

module.exports = Section