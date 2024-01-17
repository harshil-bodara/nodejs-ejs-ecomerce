const jwt = require("jsonwebtoken");

const userAuthMiddleware = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.jwtKey, (err, valid) => {
        if (err) {
          res.status(401).json({ message: "Please add valid token" });
        } else {
          next();
        }
      });
    } else {
      res.status(404).json({ message: "Please add token" });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = userAuthMiddleware;
