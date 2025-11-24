const express = require('express');
const app = express();
const  conectDB  = require('./src/config/db.config');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const seedAdmin = require('./src/services/utils/adminSeeder');


// koneksi DB
conectDB;

let whiteList = ['http://localhost:8080', 'http://example.com'];
let corsOption={
    origin: function(origin, callback){
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }       
    }
}

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Seed Admin User
seedAdmin();

// Route Check (Hanya untuk memastikan server hidup)
app.get('/', (req, res) => {
    res.send('Halo! Server API Express sudah berjalan.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


