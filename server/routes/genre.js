const express = require("express");
const router = express.Router();
const Genres = require("../models/genreModel");

router.get("/", async (req, res) => {
  try {
    const genresList = await Genres.find({});
    res.status(200).json(genresList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/addGenres", async (req, res) => {
  try {
    const genre = req.body;
    //const isExist = await Genres.findOne({ title: req.body.title });
    const isExist = await Genres.findOne({
      title: { $regex: new RegExp(req.body.title, "i") },
    }); //this command will find the case sensitive same word also///

    if (!isExist) {
      const movieList = await Genres.create(genre);
      res.status(200).json(movieList);
    } else {
      res.status(400).json({
        message: "Already genre Exists",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
module.exports = router;
