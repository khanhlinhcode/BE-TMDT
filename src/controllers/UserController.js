const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      access_token,
      refresh_token,
    } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({
        status: "ERROR",
        message: "Vui long nhap day du thong tin",
      });
    } else if (!isCheckEmail) {
      return res.status(404).json({
        status: "ERROR",
        message: "Vui long nhap day du thong tin email",
      });
    } else if (password !== confirmPassword) {
      return res.status(404).json({
        status: "ERROR",
        message: "Mat Khau Phai Trung Nhau",
      });
    }
    console.log("isCheckEmail", isCheckEmail);
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({
        status: "ERROR",
        message: "Vui long nhap day du thong tin",
      });
    } else if (!isCheckEmail) {
      return res.status(404).json({
        status: "ERROR",
        message: "Vui long nhap day du thong tin email",
      });
    } else if (password !== confirmPassword) {
      return res.status(404).json({
        status: "ERROR",
        message: "Mat Khau Phai Trung Nhau",
      });
    }
    console.log("isCheckEmail", isCheckEmail);
    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The userID is required",
      });
    }
    console.log("userId", userId);
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log("userId", userId);
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The userID is required",
      });
    }
    // Check if the userID is provided
    console.log("userId", userId);
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }

  // Delete the user
};

// Return the response
const getAllUsers = async (req, res) => {
  try {
    const response = await UserService.getAllUsers();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message || "Internal server error",
    });
  }
};
const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("userId", userId);

    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "The userID is required",
      });
    }

    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message || "Something went wrong",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        status: "ERROR",
        message: "The Token is required",
      });
    }

    const response = await JwtService.refreshtokenJwtService(token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message || "Something went wrong",
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  refreshToken,
  getDetailsUser,
};
