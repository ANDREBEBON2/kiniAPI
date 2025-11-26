const Testimoni = require('../models/testimoniModel');

const createTestimoni = async (req, res) => {
    try {
        const { email, name, message } = req.body;

        const photoFilename = req.file ? req.file.filename : undefined;

        const newTestimoni = new Testimoni({
            email,
            name,
            message,
            photo: photoFilename // Jika undefined, default schema aktif
        });

        await newTestimoni.save();
        res.status(201).json({ message: 'Testimoni created successfully', testimoni: newTestimoni });
    } catch (error) {
        res.status(500).json({ message: 'Error creating testimoni', error: error.message });
    }
}
const getAllTestimoni = async (req, res) => {
    try {
        const testimoni = await Testimoni.find();
        res.status(200).json({ message: 'Testimoni retrieved successfully', testimoni });
    } catch (error) {
        res.status(500).json({ message: 'Error creating testimoni', error: error.message });
    }
}

module.exports = { createTestimoni, getAllTestimoni };