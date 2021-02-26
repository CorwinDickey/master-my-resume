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
    }
    ,img: String
    ,fullName: String
    ,bio: String
    ,sections: Array
    ,items: Array
})

const User = mongoose.model('User', userSchema)

module.exports = User