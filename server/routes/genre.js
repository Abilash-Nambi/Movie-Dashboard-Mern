const express = require("express");
const router = express.Router();
const genreModal = require("../models/genreModel");

router.get("/", async (req, res) => {
  try {
    const genresList = await genreModal.find({});
    res.status(200).json({ data: genresList });
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({
      message: "An error occurred while fetching genres.",
    });
  }
});

router.post("/addGenres", async (req, res) => {
  try {
    const { title } = req.body;
    console.log("🚀 + router.post + title:", title);

    const existingGenre = await genreModal.findOne({
      title: { $regex: new RegExp(title, "i") },
    });
    console.log("🚀 + router.post + existingGenre:", existingGenre);

    if (!existingGenre) {
      const newGenre = await genreModal.create({ title });
      res
        .status(200)
        .json({ data: newGenre, message: "Genre added successfully." });
    } else {
      res.status(400).json({ message: "Genre already exists." });
    }
  } catch (error) {
    console.error("Error adding genre:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the genre." });
  }
});

router.delete("/deleteGenre/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🚀 + router.delete + id:", id);

    // Check if the genre exists
    const existingGenre = await genreModal.findById(id);
    console.log("🚀 + router.delete + existingGenre:", existingGenre);
    if (!existingGenre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    // Delete the genre
    const deletedGenre = await genreModal.findByIdAndDelete(id);
    return res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error("Error deleting genre:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the genre" });
  }
});

module.exports = router;
