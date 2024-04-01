const express = require("express");
const router = express.Router();
const Movies = require("../models/movieModel");

router.get("/", async (req, res) => {
  try {
    const moviesList = await Movies.find({})
      .select(" title rating id genre imageName")
      .populate("genre");
    res.status(200).json(moviesList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/singleMovie/:id", async (req, res) => {
  const { id } = req.params;
  console.log("🚀 + router.get + id:", id);
  try {
    const moviesList = await Movies.findById(id)
      .select(" title rating id genre imageName")
      .populate("genre");
    res.status(200).json(moviesList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/addMovie", async (req, res) => {
  try {
    const movie = req.body;
    const isExist = await Movies.findOne({ title: req.body.title });

    if (!isExist) {
      const movieList = await Movies.create(movie);
      res.status(200).json(movieList);
    } else {
      res.status(400).json({
        message: "Already movie name  Exists",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/deleteMovie", async (req, res) => {
  console.log("🚀 + router.delete + req:", req);
  try {
    const movieId = req.body._id;
    const isExist = await Movies.findOne({ _id: req.body._id });

    if (isExist) {
      const movieList = await Movies.findByIdAndDelete({ _id: movieId });
      res.status(200).json(movieList);
    } else {
      res.status(400).json({
        message: "Movie not  Exists",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
