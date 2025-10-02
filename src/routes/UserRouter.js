const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// API tạo user
router.post("/", userController.createUser);

// API lấy danh sách user
router.get("/", userController.getAllUsers);

module.exports = router;
