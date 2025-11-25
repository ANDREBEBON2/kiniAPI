const Testimoni = require('../models/testimoniModel');

const createTestimoni = async (req, res) => {
    const { email, name, message } = req.body;
    try {
        const newTestimoni = new Testimoni({ email, name, message });
        await newTestimoni.save();
        res.status(201).json({ message: 'Testimoni created successfully', testimoni: newTestimoni });
    } catch (error) {
        res.status(500).json({ message: 'Error creating testimoni', error: error.message });
    }
}

module.exports = { createTestimoni };