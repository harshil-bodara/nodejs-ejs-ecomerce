const db = require("../confic/db");
const { register } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, cpassword, files } = req.body;
    const allReadyExistUser = await register.findOne({
      where: {
        email: email,
      },
    });
    if (allReadyExistUser) {
      throw new Error("User Already Exists");
    } else {
      if (!fullName && !email && !password && !cpassword && !files) {
        throw new Error("All fields are required");
      } else {
        if (password === cpassword) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const createNewuser = await register.create({
            fullName: fullName,
            email: email,
            password: hashPassword,
            cpassword: hashPassword,
            files: files,
          });
          let user = await createNewuser.save();

          return res.status(200).json({
            message: "user created successfully",
            user: user,
          });
        } else {
          res.send({ message: "Password doesn't match" });
        }
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
      const user = await register.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        const IsMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && IsMatch) {
          jwt.sign(
            { user },
            process.env.jwtKey,
            { expiresIn: "24h" },
            (err, token) => {
              if (err) {
                res.send({ message: "Something went wrong, please try agin" });
              }
              return res.status(200).json({
                message: "user login successfully",
                user: { user, token: token },
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

module.exports = { registerUser, loginUser };
