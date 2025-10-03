const jwt = require("jsonwebtoken");

const generalAccessToken = (payload) => {
  console.log("payload", payload);
  const access_token = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" } // chỉ cần options
  );
  return access_token;
};

module.exports = { generalAccessToken };
