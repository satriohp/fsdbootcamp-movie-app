const db = require('../db');

const getAllMovies = async (req, res) => {
  try {
    const query = `
      SELECT m.id, m.title, m.category, m.src, m.year, m.type, 
             m.is_premium AS "isPremium", m.rating, m.description,
             COALESCE(array_agg(g.name) FILTER (WHERE g.name IS NOT NULL), '{}') as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genre g ON mg.genre_id = g.id
      GROUP BY m.id
      ORDER BY m.created_at DESC
    `;
    const result = await db.query(query);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("[ERROR] getAllMovies:", error);
    return res.status(500).json({ message: "Gagal mengambil data film dari database" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT m.*, m.is_premium AS "isPremium",
      COALESCE(array_agg(g.name) FILTER (WHERE g.name IS NOT NULL), '{}') as genres
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genre g ON mg.genre_id = g.id
      WHERE m.id = $1
      GROUP BY m.id
    `;
    const result = await db.query(query, [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Film tidak ditemukan" });
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, category, type, src, year, rating, isPremium, description } = req.body;
    const query = `
      INSERT INTO movies (title, category, type, src, year, rating, is_premium, description) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *, is_premium AS "isPremium"
    `;
    const values = [title, category, type || 'film', src, year || '2024', rating || '5.0/5', isPremium || false, description || ''];
    const result = await db.query(query, values);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, type, src, year, rating, isPremium, description } = req.body;
    const query = `
      UPDATE movies SET title=$1, category=$2, type=$3, src=$4, year=$5, rating=$6, is_premium=$7, description=$8
      WHERE id=$9 RETURNING *, is_premium AS "isPremium"
    `;
    const result = await db.query(query, [title, category, type, src, year, rating, isPremium, description, id]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM movies WHERE id = $1', [id]);
    return res.status(200).json({ id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};