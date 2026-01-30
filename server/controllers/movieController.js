const { Movie, Genre } = require('../models');

class MovieController {
  // Ambil semua film beserta genrenya
  static async getAllMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: {
          model: Genre,
          attributes: ['name'],
          through: { attributes: [] } 
        },
        order: [['id', 'ASC']]
      });

      const formattedMovies = movies.map(m => {
        const movie = m.toJSON();
        movie.genres = movie.Genres.map(g => g.name);
        delete movie.Genres;
        return movie;
      });

      res.status(200).json(formattedMovies);
    } catch (err) {
      next(err);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id, {
        include: {
          model: Genre,
          attributes: ['name'],
          through: { attributes: [] }
        }
      });

      if (!movie) throw { status: 404, message: "Movie not found" };

      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }

  static async createMovie(req, res, next) {
    try {
      const { title, category, imgUrl, rating, synopsis, status } = req.body;
      const movie = await Movie.create({ title, category, imgUrl, rating, synopsis, status });
      res.status(201).json(movie);
    } catch (err) {
      next(err);
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const { id } = req.params;
      const { title, category, imgUrl, rating, synopsis, status } = req.body;
      
      const movie = await Movie.findByPk(id);
      if (!movie) throw { status: 404, message: "Movie not found" };

      await movie.update({ title, category, imgUrl, rating, synopsis, status });
      res.status(200).json(movie);
    } catch (err) {
      next(err);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      if (!movie) throw { status: 404, message: "Movie not found" };

      await movie.destroy();
      res.status(200).json({ message: `Movie ${movie.title} has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MovieController;