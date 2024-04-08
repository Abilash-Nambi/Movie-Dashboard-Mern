const usersModel = require("../models/userModel");
const { generatePasswordHash, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

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
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body.data;

    const isExist = await usersModel.findOne({ email });
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

module.exports = { signUp, signIn };
