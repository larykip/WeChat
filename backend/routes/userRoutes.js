const express = require('express')
const { registerUser, authUser } = require('../controllers/userController')

const router = express.Router()

// Register route handler
router.route('/').post(registerUser)
//handles login route
router.post('/login', authUser)

// Register error handling middleware
// router.use(errorHandler)

module.exports = router