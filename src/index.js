const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

routes(app); // mount router sau middleware
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(port, () => console.log(`Server running on port ${port}`));
