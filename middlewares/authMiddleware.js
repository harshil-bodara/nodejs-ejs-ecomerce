const jwt = require("jsonwebtoken");

const userAuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }

  jwt.verify(token, process.env.jwtKey, (err, user) => {
    if (err) {
      return res.redirect("/login");
    }
    req.user = user;
    next();
  });
};

const privateAuth = (req, res, next) => {
  const isAuthenticated = req.cookies.isAuthenticated === "true";
  if (isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

const publicAuth = (req, res, next) => {
  const isAuthenticated = req.cookies.isAuthenticated === "false";
  if (isAuthenticated) {
    next();
  } else {
    res.redirect("/category");
  }
};

module.exports = { userAuthMiddleware, privateAuth, publicAuth };
