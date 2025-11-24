const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.DB_URL + process.env.DB_NAME);

const conectDB = mongoose.connect(process.env.DB_URL + process.env.DB_NAME).then(() => {
    console.log('Connected to MongoDB database');
}).catch((err) => {
    console.error('Error connecting to MongoDB database', err);
    setInterval(() => {
        conectDB;
        console.log("Menghubungkan Ulang");
    }, 5000);
});

module.exports = conectDB;