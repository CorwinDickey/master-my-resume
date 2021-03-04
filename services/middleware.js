// ==============================================================
// SERVICE CONFIGURATION
// ==============================================================

const User = require('../models/user_model.js')
const Section = require('../models/section_model.js')
const Item = require('../models/item_model.js')

const appFunctions = {
    
    createUser: async function(userInfo) {
        // console.log(1, userInfo)
        function createUser(userInfo) {
            // console.log(2, userInfo)
            return new Promise((resolve, reject) => {
                // console.log(3, userInfo)
                User.create(userInfo, (error, createdUser) => {
                    if (error) {
                        console.log(error)
                    }
                    // console.log('Created user: ', createdUser)
                    resolve(createdUser)
                })
            })
        }
        // console.log('Test 1')
        let newUserObject = await createUser(userInfo)
        // console.log(newUserObject)
        return newUserObject
    }

    ,createSection: function(sectionInfo) {
        // console.log('Section info 1: ', sectionInfo)
        return new Promise((resolve, reject) => {
            Section.create(sectionInfo, (error, createdSection) => {
                // console.log('Created section: ', createdSection)
                resolve(createdSection)
            })
        })
    }

    ,addSectionToUser: function(sectionObject) {
        // console.log('Section object for addSectionToUser: ', sectionObject)
        return new Promise((resolve, reject) => {
            User.findById(sectionObject.user, (error, foundUser) => {
                // console.log('User found for addSectionToUser: ', foundUser)
                userSections = foundUser.sections
                userSections.push(sectionObject.id)
                // console.log('New list of sections for addSectionToUser', userSections)
                resolve(foundUser.update({sections: userSections}))
            })
        })
    }

    ,createItemInSection: async function (sectionID) {
        sectionObject = await Section.findById(sectionID, (error, foundSection) => {return foundSection})
        appFunctions.createdItem(sectionObject)
    }

    ,createItem: function (sectionObject) {
        // console.log('Section for createItem: ', sectionObject)
        return new Promise((resolve, reject) => {
            Item.create({user: sectionObject.user, section: sectionObject.id, itemType: sectionObject.itemType}, (error, createdItem) => {
                // console.log('Created item: ', createdItem)
                resolve(createdItem)
            })
        })
    }

    ,addItemToUser: function (itemObject) {
        // console.log('Item object for addItemToUser: ', itemObject)
        return new Promise ((resolve, reject) => {
            User.findById(itemObject.user, (error, foundUser) => {
                // console.log('User found for addItemToUser: ', foundUser)
                userItems = foundUser.items
                // console.log('Items already owned by user: ', userItems)
                userItems.push(itemObject.id)
                resolve(foundUser.update({items: userItems}))
            })
        })
    }

    ,addItemToSection: function (itemObject) {
        // console.log('Item object for addItemToSection: ', itemObject)
        return new Promise ((resolve, reject) => {
            Section.findById(itemObject.section, (error, foundSection) => {
                // console.log('User found for addItemToSection: ', foundSection)
                sectionItems = foundSection.items
                sectionItems.push(itemObject.id)
                resolve(foundSection.update({items: sectionItems}))
            })
        })
    }

    ,removeItemFromUser: function(itemObject) {
        return new Promise ((resolve, reject) => {
            User.findById(itemObject.user, (error, foundUser) => {
                userItems = foundUser.items
                itemIndex = userItems.indexOf(itemObject.id)
                userItems.splice(itemIndex, 1)
                resolve(foundUser.update({items: userItems}))
            })
        })
    }

    ,removeItemFromSection: function(itemObject) {
        return new Promise ((resolve, reject) => {
            Section.findById(itemObject.section, (error, foundSection) => {
                sectionItems = foundSection.items
                itemIndex = sectionItems.indexOf(itemObject.id)
                sectionItems.splice(itemIndex, 1)
                resolve(foundSection.update({items: sectionItems}))
            })
        })
    }
    
    // add basic sections to a new user profile
    ,addNewUserSections: async function(userID) {
        const newUserSections = [
            {
                name: 'Resumes'
                ,itemType: 'resume'
                ,deletable: false
                ,user: userID
            }
            ,{
                name: 'Work Experience'
                ,itemType: 'startEndBlock'
                ,user: userID
            }
            ,{
                name: 'Projects'
                ,itemType: 'singleDateBlock'
                ,user: userID
            }
            ,{
                name: 'Skills'
                ,itemType: 'list'
                ,user: userID
            }
            ,{
                name: 'Achievements'
                ,itemType: 'singleDateBlock'
                ,user: userID
            }
            ,{
                name: 'Education'
                ,itemType: 'singleDateBlock'
                ,user: userID
            }
        ]

        // let sectionsArray = []
        // console.log(newUserSections)
        for (section of newUserSections) {
            // console.log('User ID for addNewUserSections: ', userID)
            // console.log('Section info 2: ', section)
            let newSection = await appFunctions.createSection(section)
            await appFunctions.addSectionToUser(newSection)
            // console.log('New section: ', newSection)
            let newItem = await appFunctions.createItem(newSection)
            // console.log('New item: ', newItem)
            await appFunctions.addItemToUser(newItem)
            await appFunctions.addItemToSection(newItem)
            // console.log(sectionID)
            // sectionsArray.push(newSection.id)
        }
        // console.log(sectionsArray)
        // return sectionsArray
    }

    ,wait: function (ms) {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve()
            }, ms)
        })
    }
}

const userInterface = {
    createModal: function(itemObject, modalType) {
        if (modalType === 'new') {

        } else if (modalType === 'edit') {
            
        } else {

        }
    }
    
    ,showModal: async function (targetModal) {
        modal = d.querySelector(targetModal) // selects the modal
        opacity = Number(window.getComputedStyle(modal).getPropertyValue('opacity')) // gets the current opacity of the modal
        // console.log(opacity)
        modal.style.zIndex = 1 // brings the modal above the game screen
        while (opacity < 1) { // fades the modal into view so it isn't as jarring to the user
            opacity += .1 // increases the opacity by 10%
            modal.style.opacity = opacity
            // console.log(opacity)
            await app.wait(15) // waits 15 milliseconds before next increase to opacity
        }
    }
}

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        console.log('Unathenticated request');
        res.redirect('/sessions/new');
    }
}


module.exports = {
    appFunctions
    ,userInterface
    ,isAuthenticated
}