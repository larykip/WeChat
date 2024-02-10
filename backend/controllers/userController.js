const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async(req, res) => {
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

    const user = await User.create({
        name,
        email,
        password,
        pic
    })

    if(user){
        res.send(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic
        })
    }
    else {
        res.status(400)
        throw new Error('Failed to create the user!')
    }
})

module.exports = registerUser