const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

//enable cors;
app.use(
  cors({
    origin: "*",
  })
);

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/openai", require("./routes/openaiRoutes"));
app.listen(port, () => console.log(`Server iniciou na porta: ${port}`));
