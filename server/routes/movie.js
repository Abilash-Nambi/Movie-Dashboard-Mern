const express = require("express");
const router = express.Router();
const Movies = require("../models/movieModel");

router.get("/", async (req, res) => {
  try {
    const moviesList = await Movies.find({})
      .select(" title rating id genre")
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

module.exports = router;
