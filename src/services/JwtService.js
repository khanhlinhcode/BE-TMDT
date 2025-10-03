const jwt = require("jsonwebtoken");

const generalAccessToken = (payload) => {
  console.log("payload", payload);
  const accessToken = jwt.sign(
    {
      payload,
    },
    "acces_token",
    { expiresIn: "1h" }
  );
  return accessToken;
};

const generalRefreshToken = (payload) => {
  console.log("payload", payload);
  const accessToken = jwt.sign(
    {
      payload,
    },
    "refresh_token",
    { expiresIn: "365d" }
  );
  return accessToken;
};

module.exports = { generalAccessToken, generalRefreshToken };
