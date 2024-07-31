const multer = require('multer');

const store = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../public/images');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

// const fileTypes = ['/jpeg|jpg|png/'];
// const typeFilter = (req, file, cb) => {
//   if (fileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({ store, typeFilter });
module.exports = upload;
