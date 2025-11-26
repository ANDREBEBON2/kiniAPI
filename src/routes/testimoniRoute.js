const express = require('express');

const { createTestimoni, getAllTestimoni } = require('../controllers/testimoniController');
const {verifyToken} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/testimoni',upload.single('photo'), createTestimoni);
router.get('/testimoni', verifyToken, getAllTestimoni);

module.exports = router;