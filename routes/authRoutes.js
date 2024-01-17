const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const multer = require("multer");

const uploads = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "upload/");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + "_" + file.originalname);
    },
  }),
}).single("files");

router.post("/register", uploads, registerUser);
router.post("/login", loginUser);

module.exports =  router ;
