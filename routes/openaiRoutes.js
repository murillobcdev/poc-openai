const express = require("express");
const { storage } = require("../controllers/multerController");
const multer = require("multer");
const router = express.Router();
const upload = multer({ storage: storage });

const {
  generateImage,
  generateVariations,
  generateEdition,
} = require("../controllers/openaiController");

router.post("/generateimage", generateImage);
router.post("/generatevariation", upload.single("file"), generateVariations);
router.post("/generateedition", generateEdition);
router.get("/ping", (req, res) => {
  if (req) res.send("pong");
});

module.exports = router;
