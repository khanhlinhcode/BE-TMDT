const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    // Lấy token từ header "token"
    console.log("check token", req.headers.token);

    const bearerToken = req.headers.token;
    if (!bearerToken) {
      return res.status(401).json({
        status: "ERROR",
        message: "No token provided",
      });
    }
    // Cắt "Bearer " ra để lấy token thực sự
    const token = bearerToken.split(" ")[1];
    // Xác thực token
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: "ERROR",
          message: "Token is invalid",
        });
      }
      // Nếu token hợp lệ → gắn user vào request để dùng ở controller
      req.user = user;
      console.log("user", user);

      const { payload } = user;
      if (user?.isAdmin) {
        console.log("true");
        return next();
      } else {
        return res.status(403).json({
          message: "You are not admin",
          status: "ERROR",
        });
      }
      next(); // Cho phép đi tiếp vào route
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Internal server error",
    });
  }
};

const authUserMiddleware = (req, res, next) => {
  try {
    // Lấy token từ header "token"
    console.log("check token", req.headers.token);

    const bearerToken = req.headers.token;
    if (!bearerToken) {
      return res.status(401).json({
        status: "ERROR",
        message: "No token provided",
      });
    }
    const token = bearerToken.split(" ")[1];
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: "ERROR",
          message: "Token is invalid",
        });
      }
      // Nếu token hợp lệ → gắn user vào request để dùng ở controller
      req.user = user;
      console.log("user", user);
      if (user?.isAdmin || user?.id === userId) {
        console.log("true");
        return next();
      } else {
        return res.status(403).json({
          message: "You are not admin",
          status: "ERROR",
        });
      }
      next(); // Cho phép đi tiếp vào route
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Internal server error",
    });
  }
};
module.exports = { authMiddleware, authUserMiddleware };
