const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  imageName: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },

  genre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genres",
    },
  ],
});
module.exports = mongoose.model("Movies", movieSchema);
