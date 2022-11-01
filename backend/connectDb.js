const mongoose = require('mongoose');

const connectDb = async (dbUrl) =>{
    try {
        await mongoose.connect(dbUrl);
        console.log('Database connection successful');
    } catch (error) {
        console.log('Database connection FAILED!');
        console.log(error.message);
    }
}

module.exports = connectDb;