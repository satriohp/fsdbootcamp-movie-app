const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const verifyToken = require('../middlewares/verifyToken'); 

if (!movieController) {
  throw new Error("movieController gagal dimuat! Periksa module.exports di controller.");
}

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', verifyToken, movieController.createMovie);
router.patch('/:id', verifyToken, movieController.updateMovie);
router.delete('/:id', verifyToken, movieController.deleteMovie);

module.exports = router;