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

    const isExist = await userModel.findOne({ email });
    console.log("🚀 + signUp + isExist:", isExist);

    if (!isExist) {
      const hashPass = await generatePasswordHash(password);
      const UserList = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashPass,
      });

      // Fetching the created user again with password excluded
      const userWithoutPassword = await userModel
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

    const result = await userModel.updateOne(
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
      const moviesList = await userModel
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

    if (!userId || !movieId) {
      return res
        .status(400)
        .json({ message: "userId and movieId are required" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $push: { movies: movieId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error adding movie to watch later:", error);
    res.status(500).json({
      message: "An error occurred while adding the movie to watch later",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body.data;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Incorrect email/password" });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate access token
    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Login Success",
      token: token,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "An error occurred while signing in." });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body.data;
    //console.log("🚀 + forgetPassword + email:", email);
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
    console.log("🚀 + forgetPassword + result:", result);

    // Check if email was sent successfully
    if (result && result.accepted.length > 0) {
      res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    } else {
      res.status(500).json({ message: "Failed to send password reset email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { data } = req.body;
    console.log("🚀 + resetPassword + data:", data);
    console.log(
      "🚀 + resetPassword + PasscodeVerificationData:",
      PasscodeVerificationData
    );
    const parsedCode = parseInt(data.resetCode);
    if (parsedCode === PasscodeVerificationData.code) {
      const hashPass = await generatePasswordHash(data.newPassword);
      const update = await userModel.findByIdAndUpdate(
        PasscodeVerificationData.userId,
        {
          password: hashPass,
        },
        { new: true }
      );
      PasscodeVerificationData = {}; // Clear verification data
      res.status(200).json({ message: "Password reset successfully." });
    } else {
      res.status(401).json({ message: "You entered the wrong reset code." });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "An error occurred while resetting the password." });
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
