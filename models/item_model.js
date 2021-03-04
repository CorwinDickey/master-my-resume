const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectID, required: true}
    ,section: {type: mongoose.Schema.Types.ObjectID, required: true}
    ,itemType: {type: String}
    ,position: {type: String}
    ,company: {type: String}
    ,date: {type: Date}
    ,notes: {type: String}
    ,title: {type: String, default: 'Item Title'}
    ,description: {type: String}
    ,listItems: {type: Array}
    ,association: {type: String}
    ,startDate: {type: Date}
    ,endDate: {type: Date}
})

// owner: {type: mongoose.Schema.Types.ObjectID, required: true}
// ,section: {type: mongoose.Schema.Types.ObjectID, required: true}
// ,position: {type: String, default: 'Position you applied for.'}
// ,company: {type: String, default: 'Company you applied to.'}
// ,date: {type: Date, default: Date.now()}
// ,notes: {type: String, default: 'Notes about your application go here. Did you have an application ID? Did you use a particular account or service to apply? Etc...'}
// ,title: {type: String, required: true, default: 'New Item'}
// ,description: {type: String, default: 'Description of your new item goes here.'}
// ,listItems: ['List Item 1', 'List Item 2']
// ,association: {type: String, required: true, default: 'Where did this come from?'}
// ,startDate: {type: Date, default: Date.now() - 1}
// ,endDate: {type: Date, default: Date.now()}


const Item = mongoose.model('Item', itemSchema)

module.exports = Item