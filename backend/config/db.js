const  mongoose = require('mongoose');

//creates a connection to the Mongo database
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connection is successful ${conn.connection.host}`)
    }catch(err){
        console.log(`Error: ${err.message}`)
        process.exit()
    }
}

module.exports = connectDB