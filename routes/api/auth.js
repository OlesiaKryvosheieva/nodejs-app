const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrent,
  logoutUser,
} = require("../../controllers/users");

const { authenticate } = require("../../middlewares");

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/users/current", authenticate, getCurrent);
router.post("/users/logout", authenticate, logoutUser);

module.exports = router;
