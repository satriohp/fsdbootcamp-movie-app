const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/upload');

router.post('/upload', verifyToken, upload.single('file'), movieController.uploadImage);

module.exports = router;
