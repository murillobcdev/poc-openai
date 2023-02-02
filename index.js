const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv").config();
const app = express();

//enable cors;
app.use(cors());

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/openai", require("./routes/openaiRoutes"));
app.listen(port, () => console.log(`Server iniciou na porta: ${port}`));