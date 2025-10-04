const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Tạo access token (ngắn hạn)
const generalAccessToken = (payload) => {
  console.log("payload access", payload);
  return jwt.sign({ payload }, process.env.ACCESS_TOKEN, { expiresIn: "365d" });
};

// Tạo refresh token (dài hạn)
const generalRefreshToken = (payload) => {
  console.log("payload refresh", payload);
  return jwt.sign({ payload }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });
};

// Verify refresh token và tạo lại access token
const refreshtokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("token", token);
      jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
          console.log("verify error", err);
          return resolve({
            status: "ERROR",
            message: "Token is invalid",
          });
        }
        // lấy lại payload gốc
        const { payload } = user;
        const newAccessToken = generalAccessToken({
          id: payload?.id,
          isAdmin: payload?.isAdmin,
        });
        console.log("newAccessToken", newAccessToken);
        resolve({
          status: "SUCCESS",
          message: "Refresh token success",
          data: { accessToken: newAccessToken },
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshtokenJwtService,
};
