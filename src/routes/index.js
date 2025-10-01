const UserRouter = require("./UserRouter");
module.exports = (app) => {
  app.use("/api/user", UserRouter); // POST /api/user
};