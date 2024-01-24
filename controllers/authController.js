const db = require("../confic/db");
const { user } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const randomstring = require("randomstring");
const sendMail = require("../utils/sendMail");
const verifyToken = require("../middlewares/authMiddleware");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, profile } = req.body;
    const allReadyExistUser = await user.findOne({
      where: {
        email: email,
      },
    });

    if (!fullName && !email && !password && !profile) {
      throw new Error("All fields are required");
    } else {
      if (allReadyExistUser) {
        throw new Error("User Already Exists");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const createNewuser = await user.create({
          fullName: fullName,
          email: email,
          password: hashPassword,
          profile: profile,
        });

        let mailSubject = "Mail Verification";
        const randomToken = randomstring.generate();
        let content = `<p> Hii ${req.body.fullName} , <br> Your account is successfully register.</p>`;
        sendMail(req.body.email, mailSubject, content);

        await createNewuser.save();
        res.redirect("/login");
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
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
              res.cookie("token", token, { maxAge: 900000, httpOnly: true });

              res.redirect("/category");

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

const changePassword = async (req, res) => {
  const { password, cpassword } = req.body;
  if (password && cpassword) {
    if (password !== cpassword) {
      res.send({ message: "Password doesn't match" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);
      let newPassword = await register.update(newHashPassword, {
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({
        message: "Password change succesfully",
        newPassword: newPassword,
      });
    }
  } else {
    res.send({ message: "All fields are required" });
  }
};

module.exports = { registerUser, loginUser, changePassword };
