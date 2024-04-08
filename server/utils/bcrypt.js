const bcrypt = require("bcrypt");
const SALT = 10;
//const password = "Admin@123";

const generatePasswordHash = (password) => {
  return bcrypt.hash(password, SALT);
};
const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

module.exports = { generatePasswordHash, comparePassword };
