const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//define the schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
}, {timestamps: true})

//User method that does password comparison for verification
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//pre-save hook that runs the function before the function is finally saved
//if no modifications has been done, it proceeds to save using the next()
userSchema.pre('save', async function(next) {
    if(this.isModified){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

//create a model
const User = mongoose.model('User', userSchema)

module.exports = User