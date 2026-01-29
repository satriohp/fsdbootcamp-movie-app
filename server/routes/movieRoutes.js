const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

if (!movieController) {
  throw new Error("movieController gagal dimuat! Periksa module.exports di controller.");
}

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', movieController.createMovie);
router.patch('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;