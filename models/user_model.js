const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String
        ,unique: true
        ,required: true
    }
    ,password: {
        type: String
        ,minLength: 8
        ,required: true
    }
    ,img: {type: String, default: ''}
    ,fullName: {type: String, default: ''}
    ,bio: {type: String, default: ''}
    ,sections: {type: Array, default: []}
    ,items: {type: Array, default: []}
})

const User = mongoose.model('User', userSchema)

module.exports = User