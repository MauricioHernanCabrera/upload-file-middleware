const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const uploadMiddleware = (destination, { limitFileSize = 50 } = {}) => {
  return multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, destination);
      },

      filename(req, file, cb) {
        cb(null, `${uuidv4().substring(0, 8)}_${Date.now()}_${file.originalname}`);
      },
    }),

    limits: {
      fileSize: 1024 * 1024 * limitFileSize,
    },

    fileFilter(req, { mimetype }, cb) {
      return cb(null, true);
    },
  });
};

module.exports = uploadMiddleware;
