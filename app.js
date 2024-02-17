const express= require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

const instructorRouter = require('./routes/routes')

//MONGODB connection
const db = require('./config/connection');
db.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });



//ROUTER
app.use('/', instructorRouter);


app.listen(process.env.PORT, ()=>{
    console.log(`connected to ${process.env.PORT}`)
})