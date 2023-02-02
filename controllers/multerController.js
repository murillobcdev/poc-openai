const multer = require("multer");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, path.resolve(`${__dirname}/uploads/`));
//   },
//   filename: (req, file, callback) => {
//     const time = new Date().getTime();
//     callback(null, `${time}-${file.originalname}`);
//   },
// });

const storage = multer.memoryStorage();

module.exports = { storage };
