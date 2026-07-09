const express = require("express");
const router = express.Router();

// import controller Movie
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
} = require("../controllers/movieController");

// GET all movies
// POST new movie
router
  .route("/")
  .get(getMovies)
  .post(createMovie);

// GET movie by ID
// UPDATE movie by ID
router
  .route("/:id")
  .get(getMovieById)
  .put(updateMovie);

module.exports = router;
