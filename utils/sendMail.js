const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOption = {
      from: "jd.hmrtech@gmail.com",
      to: email,
      subject: "Forgot password",
      html: `<p> Hii ${name} , <br>Please copy the link <a href="http://localhost:5000/resetPassword?token${token}">Reset</a>your password</p>`,
    };

    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail send successfully", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
