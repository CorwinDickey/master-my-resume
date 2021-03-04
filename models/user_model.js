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
    ,img: {type: String}
    ,fullName: {type: String}
    ,bio: {type: String}
    ,sections: {type: [mongoose.Schema.Types.ObjectID]}
    ,items: {type: [mongoose.Schema.Types.ObjectID]}
})

const User = mongoose.model('User', userSchema)

module.exports = User