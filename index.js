const express = require("express");
const authRouter = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
port = process.env.port;

app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");

app.use("/", authRouter);

app.listen(port, () => {
  `server renning on port ${port}`;
});
