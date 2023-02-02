const multer = require("multer");

//salvar na memoria e devolver em buffer
const storage = multer.memoryStorage();

//se quiser salvar no disco 
////////////////////////////
// const path = require("path");
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, path.resolve(`${__dirname}/uploads/`));
//   },
//   filename: (req, file, callback) => {
//     const time = new Date().getTime();
//     callback(null, `${time}-${file.originalname}`);
//   },
// });

module.exports = { storage };