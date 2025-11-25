const express = require('express');

const { createTestimoni } = require('../controllers/testimoniController');
const router = express.Router();

router.post('/testimoni', createTestimoni);

module.exports = router;