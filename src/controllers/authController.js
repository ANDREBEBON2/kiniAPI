const userModel = require('../models/userModel');   
const {generateToken} = require('../utils/jwtHelper')
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
        
        // Jika login berhasil, buat token JWT
        const token = generateToken(user);

        // 4. Kirim Response
        res.status(200).json({
            status: 'success',
            message: 'Login berhasil',
            token: token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });


        res.status(200).json({ message: 'Login berhasil', token });
    } catch (error) {
        console.log(error);
        
    }
}
