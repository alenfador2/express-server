const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');

const { MONGO_DB: dbURL } = process.env;

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

const storage = new GridFsStorage({
  url: dbURL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file, res) => {
    {
      return {
        filename: Date.now + '-' + file.originalname,
        bucketName: 'images',
      };
    }
  },
});

const fileTypes = /jpeg|jpg|png|gif/;
const typeFilter = (req, file, cb) => {
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
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
