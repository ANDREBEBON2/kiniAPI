const multer = require('multer');
const path = require('path');



// Konfigurasi penyimpanan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Mundur satu folder dari 'src/middleware' ke root, lalu masuk ke 'public/images'
        cb(null, path.join(__dirname, '../../public/images'));
    },
    filename: (req, file, cb) => {
        // Format: timestamp-namafile.jpg
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Filter file (Hanya gambar)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Format file tidak didukung! Hanya png, jpg, dan jpeg.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Batas ukuran file 5MB
    },
    fileFilter: fileFilter
});

module.exports = upload;