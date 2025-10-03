const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// API tạo user
router.post("/", userController.createUser);

// router.post("/sign-up", userController.createUser);
// router.post("/sign-in", userController.loginUser );
// // API lấy danh sách user
// router.get("/", userController.getAllUsers);

module.exports = router;
