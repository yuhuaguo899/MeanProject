const express = require("express");
const path=require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes =require('./routes/posts');
const userRoutes =require('./routes/user');
const app = express();
require('dotenv').config();



mongoose
  .connect(
    "mongodb+srv://yuhua:"+process.env.MONGO_ATLAS_PW+"@cluster123-ygcbk.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to db");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);


module.exports = app;
