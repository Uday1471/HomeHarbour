const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const api = require('../api.js')
const path = require('path')


app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/",api);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/index.html"));
});

module.exports = app;
