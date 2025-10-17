const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

// API tạo user
router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/log-out", userController.logoutUser);

router.put("/update-user/:id", userController.updateUser);

router.get("/getAll", authMiddleware, userController.getAllUsers);

router.delete("/delete-user/:id", authMiddleware, userController.deleteUser);

router.get(
  "/get-details/:id",
  authUserMiddleware,
  userController.getDetailsUser
);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
