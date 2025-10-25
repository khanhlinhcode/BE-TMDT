const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
routes(app); // mount router sau middleware
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(port, () => console.log(`Server running on port ${port}`));
