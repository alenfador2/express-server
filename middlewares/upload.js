const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '_' + path.extname(file.originalname));
  },
});

const fileTypes = /jpeg|jpg|png|gif/;
const typeFilter = (req, file, cb) => {
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype & extname) {
    return cb(null, true);
  } else {
    return cb(
      new Error('Invalid filetype. Only JPEG, JPG, PNG, and GIF are allowed'),
      false
    );
  }
};

const upload = multer({ storage, fileFilter: typeFilter });
module.exports = upload;
