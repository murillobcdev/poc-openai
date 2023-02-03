const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);
const numberOfImages = 4;
const medium = "512x512";

//função para gerar uma imagem baseada na descrição
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

//função para gerar variações da imagem
const generateVariations = async (req, res) => {
  if (req.file.mimetype != "image/png") {
    return res
      .status(400)
      .json({ success: false, data: "Formato de imagem inválido." });
  } else {
    let bufferData = req.file.buffer;
    bufferData.name = req.file.originalname;
    try {
      const response = await openai.createImageVariation(
        bufferData,
        numberOfImages,
        medium
      );
      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      handleErrors(error, res);
    }
  }
};

//função para gerar uma edição baseada na imagem, na mascara e na descrição
const generateEdition = async (req, res) => {
  let maxImagesSupported = 2;
  req.files.forEach((file) => {
    if (file.mimetype != "image/png") {
      return res
        .status(400)
        .json({ success: false, data: "Formato de imagem inválido." });
    }
  });
  if (req.files.length > maxImagesSupported) {
    return res.status(400).json({
      success: false,
      data: "Você só pode enviar duas imagens. A imagem a ser modificada e a máscara.",
    });
  } else {
    let prompt = req.body.prompt;
    let image = req.files[0].buffer;
    let mask = req.files[1]?.buffer;
    image.name = req.files[0].originalname;
    mask.name = req.files[1]?.originalname;
    try {
      const response = await openai.createImageEdit(
        image,
        mask,
        prompt,
        numberOfImages,
        medium
      );
      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      handleErrors(error, res);
    }
  }
};

//função para tratar os erros
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