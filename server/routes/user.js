const express = require("express");
const { signUp, signIn } = require("../controller/userController");

const router = express.Router();

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

router.post("/addUser", signUp);
router.post("/signIn", signIn);

module.exports = router;
