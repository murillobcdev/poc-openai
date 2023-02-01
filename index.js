const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// // Set static folder

// app.use(express.static(path.join(__dirname, 'public')));

app.use("/openai", require("./routes/openaiRoutes"));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => console.log("Hello World! Server is running."));

app.listen(port, () => console.log(`Server iniciou na porta: ${port}`));
