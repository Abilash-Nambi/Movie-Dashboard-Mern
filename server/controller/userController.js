const userModel = require("../models/userModel");

const { generatePasswordHash, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const { resetPasswordNodeMailer } = require("../utils/nodemailer");
const { generateVerificationCode } = require("../utils/verificationCode");

let PasscodeVerificationData = {};

const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body.data;
    console.log("🚀 + signUp + password:", password);

    const isExist = await usersModel.findOne({ email });
    console.log("🚀 + signUp + isExist:", isExist);

    if (!isExist) {
      const hashPass = await generatePasswordHash(password);
      const UserList = await usersModel.create({
        firstName,
        lastName,
        email,
        password: hashPass,
      });

      // Fetching the created user again with password excluded
      const userWithoutPassword = await usersModel
        .findById(UserList._id)
        .select("-password");

      res.status(200).json(userWithoutPassword);
      return;
    } else {
      res.status(400).json({
        message: "This email address has already been registered!.",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const removeWatchLaterList = async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log("🚀 + removeWatchLaterList + userId:", userId);
    const movieId = req.body.data;
    console.log("🚀 + removeWatchLaterList + movieId:", movieId);

    if (!userId || !movieId) {
      return res
        .status(400)
        .json({ message: "userId and movieId are required" });
    }

    const result = await usersModel.updateOne(
      { _id: userId },
      { $pull: { movies: movieId } }
    );
    if (result.acknowledged) {
      if (result.modifiedCount === 1 && result.matchedCount === 1) {
        console.log(
          "Movie successfully removed from the user's watch later list"
        );
        return res
          .status(200)
          .json({ message: "Movie removed from watch later list" });
      } else {
        console.log("Movie was not found in the user's watch later list");
        return res.status(400).json({
          message: "Movie was not found in the user's watch later list",
        });
      }
    } else {
      console.log("Operation was not acknowledged by the server");
    }
  } catch (error) {
    console.error("Error in removeWatchLaterList:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const watchLaterList = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (userId) {
      const moviesList = await usersModel
        .find({ _id: userId })
        .select("movies")
        .populate({ path: "movies", populate: { path: "genre" } });
      //console.log("🚀 + watchLaterList + moviesList:", moviesList);
      return res.status(200).json(moviesList);
    } else {
      return res.status(400).json({ message: "userId is required" });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const addToWatchLater = async (req, res) => {
  try {
    const userId = req.query.userId;
    const { movieId } = req.body.data;
    if (userId && movieId) {
      const newList = await usersModel.findByIdAndUpdate(
        userId,
        {
          $push: { movies: movieId },
        },
        { new: true }
      );

      return res.status(200).json(newList);
    } else {
      return res.status(400).json({ message: "userId/movieId is required" });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body.data;

    const isExist = await userModel.findOne({ email });
    // console.log("🚀 + signIn + isExist:", isExist);

    if (isExist) {
      const validPassword = await comparePassword(password, isExist.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      //generate acess token..
      const token = generateToken(isExist._id);
      console.log("🚀 + signIn + token:", token);
      return res.status(200).json({
        message: "Login Success",
        token: token,
        email: isExist.email,
        id: isExist._id,
      });
    } else {
      res.status(400).json({
        message: "Incorrect email/password",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("🚀 + forgetPassword + email:", email);
    const exist = await userModel.findOne({ email: email });

    if (!exist) {
      res
        .status(400)
        .json({ message: `No user found with email: ${email} 👎🏻` });
      return;
    }
    const code = generateVerificationCode();
    PasscodeVerificationData.userId = exist._id;
    PasscodeVerificationData.code = code;
    console.log("🚀 + PasscodeVerificationData:", PasscodeVerificationData);
    const result = await resetPasswordNodeMailer(email, code);
    //console.log("🚀 + forgetPassword + result:", result);
    res.json({ message: result });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { passwordReset } = req.body;
    // console.log("🚀 + resetPassword + passwordReset:", passwordReset);
    //console.log(PasscodeVerificationData, "465");
    if (passwordReset.resetCode === PasscodeVerificationData.code) {
      const hashPass = await generatePasswordHash(passwordReset.newPassword);
      const update = await userModel.findByIdAndUpdate(
        PasscodeVerificationData.userId,
        {
          password: hashPass,
        },
        { new: true }
      );
      PasscodeVerificationData = {};
      res.json(update);
    } else {
      res.status(401).json({ message: "You entered the wrong reset code!.😣" });
    }
  } catch (error) {
    console.log("🚀 + resetPassword + error:", error);
  }
};

module.exports = {
  signUp,
  signIn,
  addToWatchLater,
  watchLaterList,
  removeWatchLaterList,
  forgetPassword,
  resetPassword,
};
