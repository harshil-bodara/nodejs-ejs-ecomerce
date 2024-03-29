const db = require("../confic/db");
const { user, category } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const randomstring = require("randomstring");
const sendMail = require("../utils/sendMail");

const registerUser = async (req, res) => {
  try {
    const { role, fullName, email, password } = req.body;
    const { filename } = req.file;
    const allReadyExistUser = await user.findOne({
      where: {
        email: email,
      },
    });
    if ((!role, !fullName && !email && !password && !filename)) {
      throw new Error("All fields are required");
    } else {
      if (allReadyExistUser) {
        throw new Error("User Already Exists");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const createNewuser = await user.create({
          role: role,
          fullName: fullName,
          email: email,
          password: hashPassword,
          profile: filename,
        });
        res.redirect("/login");
        return await createNewuser.save();
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// for admin
const getAllUser = async (req, res) => {
  try {
    let users = await user.findAll({});
    res.render("admin/adminUser", {
      title: "Admin User",
      user: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (email && password) {
      const users = await user.findOne({
        where: {
          email: email,
        },
      });
      if (users) {
        const IsMatch = await bcrypt.compare(password, users.password);
        if (email === users.email && IsMatch) {
          jwt.sign(
            { email: users.email, password: users.password, id: users.id },
            process.env.jwtKey,
            { expiresIn: "24h" },
            (err, token) => {
              if (err) {
                res.send({ message: "Something went wrong, please try agin" });
              }
              res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
              });
              res.cookie("isAuthenticated", "true");

              if (users.role === "admin") {
                res.redirect("/admin/user");
              } else if (users.role === "user") {
                res.redirect("/category");
              } else {
                res.redirect("/login");
              }
              return res.status(200).json({
                message: "user login successfully",
                user: { email, password, id, token: token },
              });
            }
          );
        } else {
          res.send({ result: "User not found" });
        }
      } else {
        res.send({ result: "You are not register user" });
      }
    } else {
      res.send({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, cpassword ,email } = req.body;
    const userData = await user.findOne({ email: email });
    const {id} = userData
    if (password && cpassword) {
      if (password !== cpassword) {
        res.send({ message: "Password doesn't match" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        let newPassword = await user.update({password: newHashPassword}, {
          where: {
            id: id,
          },
        });
        
      }
    } else {
      res.send({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const userData = await user.findOne({ email: email });
  if (userData) {
    
    const randomToken = randomstring.generate();
    let users = await user.update(
      { token: randomToken },
      {
        where: {
          email: email,
        },
      }
    );
    sendMail(userData.fullName, userData.email, randomToken)
    res.redirect("/login");
    // res.status(200).send({
    //   message: "Please check your inbox of mail and reset your password",
    // });
  } else {
    res.status(200).send({ message: "This email does not exist" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { password, cpassword } = req.body;
    if (password && cpassword) {
      if (password !== cpassword) {
        res.send({ message: "Password doesn't match" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        let newPassword = await user.update({password: newHashPassword}, {
          where: {
            id: id,
          },
        });
        res.redirect("/changePassword");
      }
    } else {
      res.send({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  resetPassword,
  forgotPassword,
  changePassword
};
