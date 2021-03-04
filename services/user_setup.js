// ==============================================================
// SERVICE CONFIGURATION
// ==============================================================

const User = require('../models/user_model.js')
const Section = require('../models/section_model.js')
const Item = require('../models/item_model.js')

const userSetup = {
    
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

    ,createItem: function(sectionObject) {
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
            let newSection = await userSetup.createSection(section)
            await userSetup.addSectionToUser(newSection)
            // console.log('New section: ', newSection)
            let newItem = await userSetup.createItem(newSection)
            // console.log('New item: ', newItem)
            await userSetup.addItemToUser(newItem)
            await userSetup.addItemToSection(newItem)
            // console.log(sectionID)
            // sectionsArray.push(newSection.id)
        }
        // console.log(sectionsArray)
        // return sectionsArray
    }
}

module.exports = userSetup