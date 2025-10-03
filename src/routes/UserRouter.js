const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// API tạo user
router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);

module.exports = router;
