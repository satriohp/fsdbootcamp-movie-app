const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const movieRoutes = require('./movieRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/', authRoutes);
router.use('/movie', movieRoutes);
router.use('/', uploadRoutes);

module.exports = router;