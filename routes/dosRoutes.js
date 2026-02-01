const express = require('express');
const router = express.Router();

const { createDos, getMyDos } = require('../controllers/docController');
const protect = require('../middleware/user.middleware');

// PROTECTED ROUTES
router.post('/', protect, createDos);
router.get('/', protect, getMyDos);

module.exports = router;
