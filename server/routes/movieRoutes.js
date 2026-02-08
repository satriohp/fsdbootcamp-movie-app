const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, movieController.getAllMovies);
router.get('/:id', verifyToken, movieController.getMovieById);
router.post('/', verifyToken, movieController.createMovie);
router.patch('/:id', verifyToken, movieController.updateMovie);
router.delete('/:id', verifyToken, movieController.deleteMovie);

module.exports = router;