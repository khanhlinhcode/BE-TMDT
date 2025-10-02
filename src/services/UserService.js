const User = require("../models/UserModel");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { username, email, password, phone, access_token, refresh_token } =
      newUser;
    try {
      const checkEmail = await User.findOne({ email });
      if (checkEmail) {
        return resolve({
          status: "ERR",
          message: "The email already exists",
        });
      }

      const checkUsername = await User.findOne({ username });
      if (checkUsername) {
        return resolve({
          status: "ERR",
          message: "The username already exists",
        });
      }

      const createdUser = await User.create({
        username,
        email,
        password,
        phone,
        access_token,
        refresh_token,
      });

      return resolve({
        status: "OK",
        message: "User created successfully",
        data: createdUser,
      });
    } catch (e) {
      return reject(e);
    }
  });
};

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find({});
      return resolve({
        status: "OK",
        message: "Get all users successfully",
        data: users,
      });
    } catch (e) {
      return reject(e);
    }
  });
};

module.exports = { createUser, getAllUsers };
