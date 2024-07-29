const bcrypt = require("bcryptjs");

exports.encryptPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    return error;
  }
};

exports.checkPassword = async (password, userPassword) => {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch (error) {
    return error;
  }
};
