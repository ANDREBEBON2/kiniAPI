const express = require('express');

const { createTestimoni, getAllTestimoni } = require('../controllers/testimoniController');
const {verifyToken} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/testimoni', createTestimoni);
router.get('/testimoni', verifyToken, getAllTestimoni);

module.exports = router;