// ==============================================================
// DEPENDENCIES
// ==============================================================
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

require('dotenv').config()

// ==============================================================
// APP CONFIGURATION
// ==============================================================
const APP = express()
const PORT = process.env.PORT || 3000
const MONGODBURI = process.env.MONGODBURI

// ==============================================================
// CONTROLLERS
// ==============================================================
const sectionsController = require('./controllers/sections_controller.js')
const usersController = require('./controllers/users_controller.js')

// ==============================================================
// DATABASE CONFIGURATION
// ==============================================================
mongoose.connect(
    MONGODBURI,
    {
        useNewUrlParser: true
        ,useFindAndModify: false
        ,useUnifiedTopology: true
    }
    ,() => {
        console.log('the connection with mongod is established at:', MONGODBURI)
    }
)
mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})

// ==============================================================
// MIDDLEWARE
// ==============================================================
APP.use(express.urlencoded({extended: true}))
APP.use(methodOverride('_method'))
// APP.use(session({
//     secret: process.env.SECRET
//     ,resave: false
//     ,saveUninitialized: false
// }))

APP.use('/section', sectionsController)
APP.use('/user', usersController)

APP.get('/', (req, res) => {
    res.send('Hello World!')
})

// ==============================================================
// LISTENER
// ==============================================================
APP.listen(PORT, () => {
    console.log('Master My Resume is up and listening on port:', PORT)
})