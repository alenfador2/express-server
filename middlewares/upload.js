const fs = require('fs');
const multer = require('multer');
const path = require('path');

// const imageDir = path.join(__dirname, 'public/images');

// if (!fs.existsSync(imageDir)) {
//   fs.mkdirSync(imageDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, imageDir);
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now() + '_' + path.extname(file.originalname));
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/images');
  },
  filename: function (req, file, cb) {
    const uniqueFileName = Date.now() + '-' + Math.floor(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueFileName);
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
