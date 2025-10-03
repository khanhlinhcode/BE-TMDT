const UserService = require("../services/UserService");
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

module.exports = { createUser, loginUser };
