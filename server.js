// ==============================================================
// DEPENDENCIES
// ==============================================================
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const cookieParser = require('cookie-parser')

require('dotenv').config()

// ==============================================================
// APP CONFIGURATION
// ==============================================================
const APP = express()
const PORT = process.env.PORT || 3000
const DB_NAME = 'master_my_resume'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + DB_NAME

// ==============================================================
// CONTROLLERS
// ==============================================================
const sectionsController = require('./controllers/sections_controller.js')
const usersController = require('./controllers/users_controller.js')
const sessionsController = require('./controllers/sessions_controller')
const itemsController = require('./controllers/items_contoller.js')

// ==============================================================
// DATABASE CONFIGURATION
// ==============================================================
mongoose.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true
        ,useFindAndModify: false
        ,useUnifiedTopology: true
    }
    ,() => {
        console.log('the connection with mongod is established at:', MONGODB_URI)
    }
)
mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})
mongoose.connection.on('error', error => {console.log(error)})

// ==============================================================
// MIDDLEWARE
// ==============================================================
APP.use(express.urlencoded({extended: true}))
APP.use(methodOverride('_method'))
APP.use(express.static('public'))
APP.use(cookieParser(process.env.SECRET))
APP.use(session({
    secret: process.env.SECRET
    ,resave: false
    ,saveUninitialized: false
}))

APP.use('/section', sectionsController)
APP.use('/user', usersController)
APP.use('/session', sessionsController)
APP.use('/section/:id', itemsController)

APP.get('/*', (req, res) => {
    res.render('index.ejs')
})

// ==============================================================
// LISTENER
// ==============================================================
APP.listen(PORT, () => {
    console.log('Master My Resume is up and listening on port:', PORT)
})