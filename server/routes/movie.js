const express = require("express");
const router = express.Router();

const movieModel = require("../models/movieModel");
const genreModel = require("../models/genreModel");

router.get("/", async (req, res) => {
  try {
    const moviesList = await movieModel
      .find({})
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
  try {
    const moviesList = await movieModel
      .findById(id)
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
    const isExist = await movieModel.findOne({
      title: { $regex: new RegExp(`\\b${req.body.title}\\b`, "i") }, // Whole word match, case-insensitive
    });

    if (!isExist) {
      const movieList = await movieModel.create(movie);
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
    const isExist = await movieModel.findOne({ _id: req.body._id });

    if (isExist) {
      const movieList = await movieModel.findByIdAndDelete({ _id: movieId });
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
    const isExist = await movieModel.findOne({ _id: movieData._id });

    if (isExist) {
      const movieList = await movieModel.findByIdAndUpdate(
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

router.post("/filter", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 3;
    let genre = req.body.data;
    const skipCount = page * limit;
    let filter = {};
    if (genre?.length > 0) {
      const genreData = await genreModel.find({ title: { $in: genre } });
      const genreObjId = genreData.map((data) => data._id);
      filter.genre = { $all: genreObjId };
      const filteredMovies = await movieModel
        .find(filter)
        .populate("genre")
        .skip(skipCount)
        .limit(limit);

      const totalCount = await movieModel.countDocuments(filter);
      const totalPage = Math.ceil(totalCount / limit);
      res.status(200).json({
        movieList: filteredMovies,
        page,
        totalPage,
      });
    } else {
      console.log("alert");
      const moviesList = await movieModel
        .find({})
        .select("title rating id genre imageName")
        .populate("genre")
        .skip(skipCount)
        .limit(limit);

      const totalCount = await movieModel.countDocuments(filter);
      const totalPage = Math.ceil(totalCount / limit);
      res.status(200).json({ movieList: moviesList, page, totalPage });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
