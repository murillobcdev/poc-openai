const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv").config();
const path = require("path");
const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use("/openai", require("./routes/openaiRoutes"));
app.listen(port, () => console.log(`Server iniciou na porta: ${port}`));
