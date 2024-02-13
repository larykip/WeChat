const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')

//Registration controller
const registerUser = asyncHandler(async(req, res) => {
    //saves user input (uses destructuring method)
    const {name, email, password, pic} = req.body

    //throws an error if user submits an empty field
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please input all the required fields')
    }

    //checks from the DB if the inputted email exists
    const userExists = await User.findOne({ email })

    //throws an error if it finds the user exista
    if(userExists){
        res.status(400);
        throw new Error('User already exists!')

    }

    //creates & saves a new user
    const user = await User.create({
        name,
        email,
        password,
        pic
    })

    //displays the new data
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            token: generateToken(user.id)
        })
    }
    else {
        res.status(400)
        throw new Error('Failed to create the user!')
    }
})

//login controller
const authUser = asyncHandler(async(req, res) => {
    //gets inputed data
    const {email, password} = req.body

    //checks if user exists by checking the email as they are unique(strictly 1 per user)
    const user = await User.findOne({ email })

    //checks if user exists & uses the matchPassword method which will compare the password
    if(user && (await user.matchPassword(password))){
        //displays the data
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('User does not exist!')
    }
})

module.exports = { registerUser, authUser }