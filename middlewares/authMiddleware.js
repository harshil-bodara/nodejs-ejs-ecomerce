const jwt = require("jsonwebtoken");
<<<<<<< Updated upstream
const db = require("../confic/db");
const { user } = db;

// const userAuthMiddleware = async (req, res, next) => {
//   try {
//     let token = req.headers["authorization"];
//     if (token) {
//       token = token.split(" ")[1];
//       const decodedToken = jwt.verify(token, process.env.jwtKey, (err, valid) => {
//         if (err) {
//           res.status(401).json({ message: "Please add valid token" });
//         } else {
//           req.token = token;
//           req.user = user;
//           next();
//         }
//       });
//     } else {
//       res.status(404).json({ message: "Please add token" });
//     }
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };

// const userAuthMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     let authToken;
//     if (token) {
//       authToken = token.split(" ")[1];
//     }
//     if (!authToken) {
//       res.status(401).json({ message: "Please add token!" });
//     }
//     const decodedToken = await util.promisify(jwt.verify)(
//       token,
//       process.env.jwtKey
//     );

//     const user = await user.findOne(decodedToken.id);
//     if (!user) {
//       res.status(400).json({ message: "User not found!" });
//     }
//     req.token = token;
//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };
=======
>>>>>>> Stashed changes

const userAuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
  }

  jwt.verify(token, process.env.jwtKey, (err, user) => {
    if (err) {
      return res.redirect("/login");
    }
    req.user = user;
    next();
  });
};

module.exports = { userAuthMiddleware, checkAuth, loginAuth };
