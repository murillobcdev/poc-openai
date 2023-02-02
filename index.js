const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

//enable cors;
// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/openai", require("./routes/openaiRoutes"));
app.listen(port, () => console.log(`Server iniciou na porta: ${port}`));
