const bcrypt = require("bcryptjs");

exports.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.checkPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};
