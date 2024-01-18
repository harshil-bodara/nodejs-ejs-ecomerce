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

  module.exports = uploads