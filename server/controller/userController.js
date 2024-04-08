const usersModel = require("../models/userModel");
const { generatePasswordHash, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const isExist = await usersModel.findOne({ email });

    if (!isExist) {
      const hashPass = await generatePasswordHash(password);
      const UserList = await usersModel.create({
        firstName,
        lastName,
        email,
        password: hashPass,
      });
      res.status(200).json(UserList);
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
    const { email, password } = req.body;

    const isExist = await usersModel.findOne({ email });
    console.log("🚀 + signIn + isExist:", isExist);

    if (isExist) {
      const validPassword = await comparePassword(password, isExist.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      //generate acess token..
      const token = generateToken(isExist._id);
      return res.status(200).json({
        message: "Login Success",
        token,
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
