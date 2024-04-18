const express = require("express");
const {
  signUp,
  signIn,
  addToWatchLater,
  watchLaterList,
  removeWatchLaterList,
  forgetPassword,
  resetPassword,
} = require("../controller/userController");
const { checkAuth } = require("../middleware/checkAuth");

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
router.put("/addToWatchLater", checkAuth, addToWatchLater);
router.get("/watchList", checkAuth, watchLaterList);
router.put("/removeMovie", removeWatchLaterList);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
