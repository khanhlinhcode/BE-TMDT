const UserRouter = require("./UserRouter");
const Routers = require("./UserRouter");
module.exports = (app) => {
  app.use("/api/user", UserRouter); // POST /api/user
};
