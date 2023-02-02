const { Configuration, OpenAIApi } = require("openai");
const formidable = require("formidable");
const fs = require("fs");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);
const numberOfImages = 4;
const medium = "512x512";

const generateImage = async (req, res) => {
  if (req.body) {
    const { prompt, size } = req.body;
    try {
      const response = await openai.createImage({
        prompt,
        n: 1,
        size,
      });
      const imageUrl = response.data.data[0].url;
      res.status(200).json({ success: true, data: imageUrl });
    } catch (error) {
      handleErrors(error, res);
    }
  }
  res.json({ success: false, data: req.body });
};

const generateVariations = async (req, res) => {
  if (req.file.mimetype != "image/png") {
    return res
      .status(400)
      .json({ success: false, data: "Formato de imagem inválido." });
  } else {
    let file = req.file.buffer;

    // console.log(req.file.buffer.write());

    try {
      const response = await openai.createImageVariation(
        fs.createReadStream(file),
        numberOfImages,
        medium
      );
      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      handleErrors(error, res);
    }
  }
};

const generateEdition = async (req, res) => {
  const { prompt, size } = req.body;
  const imageSize =
    size === "small" ? small : size === "medium" ? medium : large;
  const numberOfImages = 4;
  let form = new formidable.IncomingForm();

  form.parse(req, function (error, fields, file) {
    try {
      let filepath = file.upload.filepath;
      let newpath = "C:/upload-example/";
      newpath += file.upload.originalFilename;

      fs.rename(filepath, newpath, async function () {
        try {
          const responseEdition = await openai.createImageEdit(
            fs.createReadStream(newpath),
            prompt,
            numberOfImages,
            imageSize
          );

          res.status(200).json({ success: true, _v: responseEdition.data });
        } catch (error) {
          handleErrors(error, res);
        }
      });
    } catch (error) {
      handleErrors(error, res);
    }
  });
};

function handleErrors(error, res) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }
  res.status(400).json({
    success: false,
    error: "A imagem não pôde ser gerada.",
  });
}

module.exports = { generateImage, generateVariations, generateEdition };
