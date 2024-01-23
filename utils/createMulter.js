const multer = require("multer");

try {
  const uploads = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "upload/");
      },
      filename: (req, file, cb) => {
        cb(null, new Date().valueOf() + "_" + file.originalname);
      },
    }),
  });

  module.exports = uploads;
} catch (error) {
  console.log("error", error);
}
