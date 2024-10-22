import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
// console.log("this is the starting of the project");
const port = process.env.PORT;

app.get("/", (req, res) => {

  res.send("here our server has been start ");
});

app.listen(port, () => {
  console.log(
    `the server has been start on the port number http://localhost:${port}`
  );
});
