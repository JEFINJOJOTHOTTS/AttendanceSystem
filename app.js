const express= require('express');
const app = express();
require('dotenv').config();

//MONGODB connection
const db = require('./config/connection');
db.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });


app.listen(process.env.PORT, ()=>{
    console.log(`connected to ${process.env.PORT}`)
})