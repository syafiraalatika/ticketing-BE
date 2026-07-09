const Movie = require("../models/Movies");

/**
 * @desc    Get all movies
 * @route   GET /api/movies
 * @access  Public
 */
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * @desc    Get movie by ID
 * @route   GET /api/movies/:id
 * @access  Public
 */
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMovies,
  getMovieById,
};
