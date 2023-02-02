const express = require("express");
const multer = require("multer");
const { storage } = require("../controllers/multerController");
const router = express.Router();
const upload = multer({ storage: storage });

const {
  generateImage,
  generateVariations,
  generateEdition,
} = require("../controllers/openaiController");

router.post("/generateedit", upload.any(), generateEdition);
router.post("/generatevariation", upload.single("file"), generateVariations);
router.post("/generateimage", generateImage);
router.get("/ping", (req, res) => res.send("pong"));

module.exports = router;
