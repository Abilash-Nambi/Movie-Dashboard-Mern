const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");

router.get("/", async (req, res) => {
  try {
    const UserList = await Users.find().select("name age movie gender");
    res.status(200).json(UserList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/addUser", async (req, res) => {
  try {
    const user = req.body;
    const isExist = await Users.findOne({ name: req.body.name });

    if (!isExist) {
      const UserList = await Users.create(user);
      res.status(200).json(UserList);
    } else {
      res.status(400).json({
        message: "Already user Exists",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
