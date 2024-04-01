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
    const isExist = await Movies.findOne({
      title: { $regex: new RegExp(`\\b${req.body.title}\\b`, "i") }, // Whole word match, case-insensitive
    });

    if (!isExist) {
      const movieList = await Movies.create(movie);
      res.status(200).json(movieList);
    } else {
      res.status(400).json({
        message: "Movie name already exists",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/deleteMovie", async (req, res) => {
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

router.put("/updateMovie", async (req, res) => {
  try {
    const movieData = req.body;
    console.log("🚀 + router.put + movieData:", movieData);
    const isExist = await Movies.findOne({ _id: movieData._id });

    if (isExist) {
      const movieList = await Movies.findByIdAndUpdate(
        movieData._id,
        movieData,
        { new: true }
      );
      res.status(200).json(movieList);
    } else {
      res.status(400).json({
        message: "movie  not  Exists",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
