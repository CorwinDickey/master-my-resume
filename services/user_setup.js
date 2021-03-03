// ==============================================================
// SERVICE CONFIGURATION
// ==============================================================

const User = require('../models/user_model.js')
const Section = require('../models/section_model.js')

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
                    console.log('user is created', createdUser)
                    resolve(createdUser)
                })
            })
        }
        // console.log('Test 1')
        let newUserObject = await createUser(userInfo)
        // console.log(newUserObject)
        return newUserObject
    }
    
    // add basic sections to a new user profile
    ,addNewUserSections: async function(userID) {
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

        function createSection(sectionObject) {
            return new Promise((resolve, reject) => {
                Section.create(sectionObject, (error, createdSection) => {
                    console.log(createdSection)
                    resolve(createdSection)
                })
                // resolve()
            })
        }

        let sectionsArray = []
        // console.log(newUserSections)
        for (section of newUserSections) {
            // console.log(section)
            let newSection = await createSection(section)
            // console.log(sectionID)
            sectionsArray.push(newSection)
        }
        // console.log(sectionsArray)
        return sectionsArray
    }
}

module.exports = userSetup