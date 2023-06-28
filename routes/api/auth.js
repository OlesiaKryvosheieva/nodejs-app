const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrent,
  logoutUser,
  uploadAvatar,
} = require("../../controllers/users");

const { authenticate, upload } = require("../../middlewares");

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);
router.get("/users/current", authenticate, getCurrent);
router.post("/users/logout", authenticate, logoutUser);
router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  uploadAvatar
);

module.exports = router;
