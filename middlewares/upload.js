const multer = require('multer');
const path = require('path');

const store = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const fileTypes = ['/jpeg|jpg|png/'];
const typeFilter = (req, file, cb) => {
  if (fileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid filetype.  Only JPEG, JPG, PNG are allowed'), false);
  }
};

const upload = multer({ store, typeFilter });
module.exports = upload;
