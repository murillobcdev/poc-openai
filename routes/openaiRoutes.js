const express = require("express");

const {
  generateImage,
  generateVariations,
  generateEdition,
} = require("../controllers/openaiController");

const router = express.Router();

router.post("/generateimage", generateImage);
router.post("/generatevariation", generateVariations);
router.post("/generateedition", generateEdition);

module.exports = router;