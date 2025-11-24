const User = require('../../models/userModel');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL; // Tambah ;
        const adminPassword = process.env.ADMIN_PASSWORD; // Tambah ;

        // 1. Validasi Environment Variable
        if (!adminEmail || !adminPassword) {
            console.warn("⚠️ Peringatan: ADMIN_EMAIL atau ADMIN_PASSWORD belum diset di .env");
            return;
        }

        // 2. Cek apakah admin sudah ada
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("ℹ️ Admin sudah ada, melewati proses seeding.");
            return;
        }

        // 3. Buat Admin Baru
        // Password dikirim plaintext, nanti akan di-hash otomatis oleh userModel pre-save
        const newAdmin = new User({
            email: adminEmail,
            password: adminPassword,    
            isVerified: true,
            name: 'Administrator'
        });

        await newAdmin.save();
        console.log("✅ Admin baru berhasil dibuat!");

    } catch (error) {
        console.error("❌ Error saat seeding admin:", error.message);
    }
};

module.exports = seedAdmin;