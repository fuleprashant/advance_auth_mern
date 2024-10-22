import express from "express";
import dotenv from "dotenv";
import db from "./database/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

db();
app.get("/", (req, res) => {
  res.send("here our server has been start ");
});

app.listen(port, () => {
  console.log(
    `the server has been start on the port number http://localhost:${port}`
  );
});
