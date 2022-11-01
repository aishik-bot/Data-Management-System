require('dotenv').config();
const express = require('express');
const app = express();

const connectDb = require('./connectDb');

const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;

connectDb(dbUrl);

app.get('/',(req, res)=>{
    res.send('Freeflow Assignment');
})

app.listen(port, ()=>{
    console.log(`Listening to port:${port}\nVisit http://localhost:${port}`)
})