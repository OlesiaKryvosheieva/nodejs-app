const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const getCurrent = require("./getCurrent");
const logoutUser = require("./logoutUser");
const uploadAvatar = require("./uploadAvatar");
const verifyUser = require("./verifyUser");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  registerUser,
  loginUser,
  getCurrent,
  logoutUser,
  uploadAvatar,
  verifyUser,
  resendVerifyEmail,
};
