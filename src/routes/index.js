const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
module.exports = (app) => {
  // user
  app.use("/api/user", UserRouter);
  // product
  app.use("/api/product", ProductRouter);
};
