const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true        
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        default: 'Admin'
    }
});

// --- PERBAIKAN DI SINI ---
userSchema.pre("save", async function (next) {
    // 1. Jika password tidak berubah, langsung lanjut (jangan hash ulang)
    if (!this.isModified("password")) {
        return next();
    }

    try {
        // 2. Hash password
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (error) {
        // 3. PERBAIKAN: Gunakan 'error' asli dari sistem, bukan errorCreate
        next(error); 
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;