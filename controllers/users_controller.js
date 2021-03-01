// ==============================================================
// CONTROLLER CONFIGURATION
// ==============================================================
const bcrypt = require('bcrypt')
const express = require('express')
const ROUTER = express.Router()
const User = require('../models/user_model.js')
const Section = require('../models/section_model.js')
// const { resolveInclude } = require('ejs')

// ==============================================================
// FUNCTIONS
// ==============================================================

// add basic sections to a new user profile
async function createUserSections(userID) {
    const newUserSections = [
        {
            name: 'Resumes'
            ,type: 'resumes'
            ,deletable: false
            ,owner: userID
        }
        ,{
            name: 'Work Experience'
            ,type: 'block-item'
            ,owner: userID
        }
        ,{
            name: 'Projects'
            ,type: 'block-item'
            ,owner: userID
        }
        ,{
            name: 'Skills'
            ,type: 'list-item'
            ,owner: userID
        }
        ,{
            name: 'Achievements'
            ,type: 'block-item'
            ,owner: userID
        }
        ,{
            name: 'Education'
            ,type: 'block-item'
            ,owner: userID
        }
    ]

    function createSection(object) {
        return new Promise((resolve, reject) => {
            console.log('testing 3', object)
            Section.create(object, (error, createdSection) => {
                console.log(createdSection.id)
                resolve(createdSection.id)
            })
            // resolve()
        })
    }

    let sectionsArray = []
    // console.log(newUserSections)
    for (section of newUserSections) {
        console.log(section)
        let sectionID = await createSection(section)
        console.log(sectionID)
        sectionsArray.push(sectionID)
    }
    console.log(sectionsArray)
    return sectionsArray
}

// ==============================================================
// ROUTES
// ==============================================================

// add new user
ROUTER.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// create new user
ROUTER.post('/', (req, res) => {
    // create a new object with the user input (hash the password) and pass that to the database
    console.log('received a user creation request ===================================')
    let newUserID = ''
    let newUser = {
        email: req.body.email
        ,password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }

    User.create(newUser, (error, createdUser) => {
        // console.log(newUser)
        console.log('user is created', createdUser)
        newUserID = createdUser.id
        // console.log(newUserID)
        res.redirect('/user/' + newUserID + '/UserSetup')
    })
})

// setup user account
ROUTER.get('/:id/UserSetup', async (req, res) => {
    User.findByIdAndUpdate(req.params.id, 
        {
            $set:{
                sections: await createUserSections(req.params.id)
            }
        }, {new: true}, (error, newUser) => {
            // console.log(newUser)
            console.log('new user sections added ===============================')
            res.redirect('/user/new')
        }
    )
    // console.log('new user sections added ===============================')
    // res.redirect('/user/new')
})

// edit user
ROUTER.get('/:id/edit', (req, res) => {
    res.send('Testing edit user route')
})

// update user
ROUTER.put('/:id', (req, res) => {
    console.log('Received a user update request')
})

// delete user
ROUTER.delete('/:id', (req, res) => {
    console.log('Received a user delete request')
    User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
        console.log('Deleting record: ' + req.params.id)
        console.log(deletedUser)
        res.redirect('/new')
    })
})

// ==============================================================
// EXPORTER
// ==============================================================
module.exports = ROUTER
