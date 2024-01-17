const express = require("express");
// const { connection } = require("./confic/db");
const dotenv = require("dotenv").config();
const registerRoutr = require("./routes/registerUser");

const app = express();
port = 5000;
app.use(express.json());
// connection();

app.use("/", registerRoutr);

app.listen(port, () => {
  `server renning on port ${port}`;
});
