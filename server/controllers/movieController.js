const { Movie, Genre, sequelize } = require('../models');
const { Op } = require('sequelize');
const { movieSchema } = require('../validations/schema');

class MovieController {
  static async getAllMovies(req, res, next) {
    try {
      const {
        search,
        genre,
        sortBy = 'id',
        order = 'ASC',
        page = 1,
        limit = 10,
      } = req.query;

      const whereClause = {};
      if (search) {
        whereClause.title = { [Op.iLike]: `%${search}%` };
      }

      const includeClause = {
        model: Genre,
        attributes: ['id', 'name'],
        through: { attributes: [] },
      };
      if (genre) {
        includeClause.where = { name: { [Op.iLike]: genre } };
      }

      const allowedSortFields = ['id', 'title', 'year', 'rating', 'createdAt'];
      const sanitizedSort = allowedSortFields.includes(sortBy) ? sortBy : 'id';
      const sanitizedOrder = ['ASC', 'DESC'].includes(order.toUpperCase())
        ? order.toUpperCase()
        : 'ASC';

      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
      const offset = (pageNum - 1) * pageSize;

      const { count, rows: movies } = await Movie.findAndCountAll({
        where: whereClause,
        include: includeClause,
        order: [[sanitizedSort, sanitizedOrder]],
        limit: pageSize,
        offset,
        distinct: true,
      });

      const formattedMovies = movies.map((m) => {
        const movie = m.toJSON();
        movie.genres = movie.Genres ? movie.Genres.map((g) => g.name) : [];
        delete movie.Genres;
        return movie;
      });

      res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: pageNum,
        data: formattedMovies,
      });
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
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      });

      if (!movie) throw { status: 404, message: 'Movie not found' };

      const movieData = movie.toJSON();
      movieData.genres = movieData.Genres ? movieData.Genres.map((g) => g.name) : [];
      delete movieData.Genres;

      res.status(200).json(movieData);
    } catch (err) {
      next(err);
    }
  }

  static async createMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const validatedData = movieSchema.parse(req.body);
      const { genreIds, ...moviePayload } = validatedData;

      const movie = await Movie.create(moviePayload, { transaction: t });

      if (genreIds && genreIds.length > 0) {
        await movie.addGenres(genreIds, { transaction: t });
      }

      await t.commit();
      res.status(201).json(movie);
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async updateMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const validatedData = movieSchema.parse(req.body);
      const { genreIds, ...moviePayload } = validatedData;

      const movie = await Movie.findByPk(id);
      if (!movie) throw { status: 404, message: 'Movie not found' };

      await movie.update(moviePayload, { transaction: t });

      if (genreIds) {
        await movie.setGenres(genreIds, { transaction: t });
      }

      await t.commit();
      res.status(200).json(movie);
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);

      if (!movie) throw { status: 404, message: 'Movie not found' };

      await movie.destroy();
      res.status(200).json({ message: `Movie with id ${id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        throw { status: 400, message: 'Tidak ada file yang diupload.' };
      }

      const imgUrl = `/uploads/${req.file.filename}`;

      res.status(200).json({
        message: 'Upload berhasil!',
        imgUrl,
        filename: req.file.filename,
        size: req.file.size,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MovieController;