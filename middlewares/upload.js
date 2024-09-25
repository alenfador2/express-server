const multer = require('multer');
const path = require('path');

const store = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename(req, file, cb) {
    cb(null, file.originalname + '_' + Date.now());
  },
});

const fileTypes = /jpeg|jpg|png|gif/;
const typeFilter = (req, file, cb) => {
  if (fileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid filetype.  Only JPEG, JPG, PNG and GIF are allowed'),
      false
    );
  }
};

const upload = multer({ store, fileFilter: typeFilter });
module.exports = upload;
