const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const connectDb = require("./config/db");
connectDb();
const PORT = 7000;

const userRoute = require("./routes/user");
const movieRoute = require("./routes/movie");
const genreRoute = require("./routes/genre");

app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/genres", genreRoute);

app.all("*", (req, res) => {
  res.status(404).json("This page does not exist");
});

app.listen(PORT, () => {
  return console.log(`your port is running on ${PORT}`);
});
