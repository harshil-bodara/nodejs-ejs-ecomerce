const express = require("express");
const authRouter = require("./routes/authRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");

const cors = require('cors')
require("dotenv").config();

const app = express();
port = process.env.port;
app.use(cors());
app.use(express.json());


app.use("/", authRouter);
app.use("/", categoryRouter);
app.use("/", productRouter);

app.listen(port, () => {
  `server renning on port ${port}`;
});
