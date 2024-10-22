import express from "express";
import dotenv from "dotenv";
import db from "./database/db.js";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT;

db();
app.use(express.json());
app.use(cookieParser());
app.use("/user", router);
app.get("/", (req, res) => {
  res.send("here our server has been start ");
});

app.listen(port, () => {
  console.log(
    `the server has been start on the port number http://localhost:${port}`
  );
});

