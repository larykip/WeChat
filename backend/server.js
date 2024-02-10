//initialize  express
const express = require('express')
//initialize dotenv
const dotenv = require('dotenv')

//import DB connection
const connectDB = require('./config/db')

//import data
const data = require('./data/data')

const app = express()
//loads environment variables from .env into process.env
dotenv.config()
//call DB connection
connectDB()

//loads the port provided and if not available, defaults to 3000
const port = process.env.PORT || 3000

app.get('/api/chats', (req, res) => {
    const getData = data
    if(!getData)
        res.send('No Data found!')
    res.send(getData)
})
app.get('/data/:id', (req, res) => {
    const myData = data.find(d => d._id === req.params.id)
    if(!myData)
        res.send('No Data found!')
    res.send(myData)
    
})

//initialize a server that listens to port 5000.
//when connected, it logs a successful connection message
app.listen(port, console.log(`server listening to port ${port}`))