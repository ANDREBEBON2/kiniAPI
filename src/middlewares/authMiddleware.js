const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    // Format header biasanya: "Bearer <token_disini>"
    const authHeader = req.headers['authorization'];

    // 2. Cek apakah header ada
    if (!authHeader) {
        return res.status(401).json({
            message: 'Akses ditolak! Token tidak ditemukan.'
        });
    }

    // 3. Ambil tokennya saja (buang kata "Bearer ")
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Akses ditolak! Format token salah.'
        });
    }

    // 4. Verifikasi Token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // BERHASIL: Simpan data user yang ada di token ke dalam request
        // Ini berguna agar Controller selanjutnya tahu SIAPA yang login
        req.user = decoded; 
        next(); 

    } catch (error) {
        // GAGAL: Token expired atau palsu
        return res.status(403).json({
            message: 'Token tidak valid atau sudah kadaluarsa.'
        });
    }
}

module.exports = {verifyToken};