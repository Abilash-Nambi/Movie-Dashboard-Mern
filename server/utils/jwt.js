var jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET_KEY
  );
};
module.exports = { generateToken };
