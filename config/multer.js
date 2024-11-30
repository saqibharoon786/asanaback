const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in memory temporarily
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept only image files
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Max size: 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
