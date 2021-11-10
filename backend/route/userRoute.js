const express = require("express");
const { registerUser, logout, loginUser, forgotPassword, resetPassword, getUserDetails } = require("../controller/userController");
const { isAuthenticatedUser } = require("../middleware/authorization");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/logout").get(logout);

module.exports = router; 