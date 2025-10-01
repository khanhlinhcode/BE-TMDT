const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    return res
      .status(201)
      .json({ message: "Create user successfully", data: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Bad request" });
  }
};

module.exports = { createUser };
