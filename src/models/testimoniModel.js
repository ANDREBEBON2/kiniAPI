const mongoose = require('mongoose');

const testimoniSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    name: {
        type: String,   
        required: true
    },
    message: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
        default: 'default.jpg'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Testimoni = mongoose.model('Testimoni', testimoniSchema);
module.exports=Testimoni;