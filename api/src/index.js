const express = require("express");
import express from "express";
import rotas from "./routes";
import mongoose from "mongoose";
import cors from "cors";

const server_bd = process.env.SERVER_MONGO ?? "127.0.0.1";

console.log(process.env);

mongoose.connect("mongodb://"+server_bd+"/videos", { useNewUrlParser: true });

const app = express();
app.use(cors());

app.use(express.json());

app.use(rotas);

app.use(function(error, req, res, next) {
  res.json({ message: error.message });
});

app.listen(5000, function() {
  console.log("Listening on port 5000!");
  console.log("Server Mongo:" + server_bd);
});
