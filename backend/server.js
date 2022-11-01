require('dotenv').config();
const express = require('express');
const app = express();

const connectDb = require('./connectDb');
const apiToDb = require('./fetchApiData');

const dataRoutes = require('./routes/dataRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;

connectDb(dbUrl);

apiToDb();
const hours = 1;
const interval = hours*60*60*1000;
let count = 0;

//fetch data from api after every interval and store in database
setInterval(()=>{
    console.log("Interval "+(++count));
    apiToDb();
},interval)


app.use('/api/v1', dataRoutes);

app.get('/',(req, res)=>{
    res.send('Freeflow Assignment');
})

app.listen(port, ()=>{
    console.log(`Listening to port:${port}\nVisit http://localhost:${port}`)
})