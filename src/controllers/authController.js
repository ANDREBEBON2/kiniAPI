const userModel = require('../models/userModel');   

// Fungsi untuk registrasi user baru


// Fungsi untuk login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User tidak ditemukan' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password salah' });
        }
        res.status(200).json({ message: 'Login berhasil' });
        
    } catch (error) {
        console.log(error);
        
    }
}
