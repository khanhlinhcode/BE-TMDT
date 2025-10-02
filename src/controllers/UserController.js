const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    return res.status(201).json({
      status: "OK",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERR",
      message: error.message || "Something went wrong",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json({
      status: "OK",
      message: "Get all users successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { createUser, getAllUsers };
