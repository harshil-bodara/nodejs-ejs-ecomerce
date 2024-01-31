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

const checkAuth = (req, res, next) => {
  const isAuthenticated = req.cookies.isAuthenticated === "true";
  if (isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

const loginAuth = (req, res, next) => {
  const isAuthenticated = req.cookies.isAuthenticated === "false";
  if (isAuthenticated) {
    next();
  } else {
    res.redirect("/category");
  }
};

const adminAuth = (req, res, next) => {
  const isAuthenticated = req.cookies.isAuthenticated === "false";
  if (isAuthenticated) {
    next();
  } else {
    res.redirect("/admin/user");
  }
};

module.exports = { userAuthMiddleware, checkAuth, loginAuth, adminAuth };
