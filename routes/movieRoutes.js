const express = require("express");
const router = express.Router();

// import controller Movie
const {
  getMovies,
  getMovieById,
} = require("../controllers/movieController");

// ~~~ Movie Routes ~~~
// GET /api/movies  (retrieve all movies)
router.get("/", getMovies);

// ~~~ Movie Detail Route ~~~
// GET /api/movies/:id  (retrieve movie by ID)
router.get("/:id", getMovieById);

module.exports = router;
