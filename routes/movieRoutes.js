const express = require("express");
const router = express.Router();

// import controller Movie
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movieController");

// import middleware
const { protect } = require("../middleware/auth");
const { requireAdmin } = require("../middleware/requireAdmin");

// GET all movies
// POST new movie
router
  .route("/")
  .get(getMovies)
  .post(protect, requireAdmin, createMovie);

// GET movie by ID
// UPDATE movie by ID
// DELETE movie by ID
router
  .route("/:id")
  .get(getMovieById)
  .put(protect, requireAdmin, updateMovie)
  .delete(protect, requireAdmin, deleteMovie);

module.exports = router;
