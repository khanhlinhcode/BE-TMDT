const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone, isAdmin } = newUser;

    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return resolve({
          status: "ERROR",
          message: "Email đã tồn tại",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone,
        isAdmin: isAdmin === "true" || isAdmin === true,
      });

      resolve({
        status: "SUCCESS",
        message: "Tạo user thành công",
        data: createdUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;

    try {
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        return resolve({
          status: "ERROR",
          message: "User không tồn tại",
        });
      }

      const comparePassword = await bcrypt.compare(
        password,
        checkUser.password
      );
      if (!comparePassword) {
        return resolve({
          status: "ERROR",
          message: "Mật khẩu không đúng",
        });
      }

      // Tạo JWT token
      const access_token = await generalAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "SUCCESS",
        message: "Login successful",
        access_token,
        refresh_token,
        data: checkUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address || "",
          avatar: data.avatar || "",
          isAdmin:
            data.isAdmin === "true" ||
            data.isAdmin === true ||
            data.isAdmin === 1,
        },
        { new: true }
      );

      resolve({
        status: "SUCCESS",
        message: "UPDATE SUCCESS",
        data: updatedUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm user theo _id
      const checkUser = await User.findById(id);
      console.log("checkUser", checkUser);

      if (!checkUser) {
        return resolve({
          status: "ERROR",
          message: "User không tồn tại",
        });
      }

      // Cập nhật user
      await User.findByIdAndDelete(id);

      resolve({
        status: "SUCCESS",
        message: "delete user successful",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: { $in: ids } });
      resolve({
        status: "SUCCESS",
        message: "deleteMany user successful",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await User.find();
      resolve({
        status: "SUCCESS",
        message: "Get all users successful",
        data: allUsers,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm user theo _id
      const checkUser = await User.findById(id);
      console.log("checkUser", checkUser);

      if (!checkUser) {
        return resolve({
          status: "ERROR",
          message: "User không tồn tại",
        });
      }

      resolve({
        status: "SUCCESS",
        message: "Lấy thông tin user thành công",
        data: checkUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getDetailsUser,
  deleteManyUser,
};
