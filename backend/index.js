import express from "express";
import dotenv from "dotenv";
import db from "./database/db.js";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

db();

app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5174", // Your frontend URL
  credentials: true, // Allow credentials
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
};

// Use CORS middleware
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use("/user", router);
app.get("/", (req, res) => {
  res.send("here our server has been start ");
});

app.listen(port, () => {
  console.log(
    `the server has been start on the port number http://localhost:${port}`
  );
});
