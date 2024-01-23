const express = require("express");
// const router = require("./routes/index");

const cors = require("cors");
require("dotenv").config();

const app = express();
port = process.env.port;
app.use(cors());
app.use(express.json());

// set template engine
app.set("view engine", "ejs");

// uploads
app.use(express.static("upload"));

// route prefix
app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log(`server renning on port http://localhost:${port}`);
});
