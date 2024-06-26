const multer = require("multer");

const store = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../public/images");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
const typeFilter = (req, file, cb) => {
  if (fileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ store, typeFilter });
