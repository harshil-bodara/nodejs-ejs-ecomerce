const registerModel = require("../models/registerModel");
const db = require("../confic/db");
const { register } = db;

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, cpassword, files } = req.body;
    const allReadyExistUser = await register.findOne({ email: email });

    // if (allReadyExistUser) {
    //   throw new Error("User Already Exists");
    // } else {
      if (!fullName && !email && !password && !cpassword && !files) {
        throw new Error("Please fill required fields");
      } else {
        if (password === cpassword) {
          const createNewuser = await register.create({
            fullName,
            email,
            password,
            cpassword,
            files,
          });
          await createNewuser.save();
          return res.status(200).json({
            message: "user created successfully",
            user: createNewuser,
          });
        }
      }
    // }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { registerUser };

