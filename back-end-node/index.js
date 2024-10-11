import express from "express";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routers/user.js";

config();

// Routes

// Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

const { MONGODB_URI, PORT } = process.env;

app.use("/user", userRouter);

// Connect to MongoDB
mongoose.connect(MONGODB_URI);
const connection = mongoose.connection;
connection.on("connected", () => {
  console.log(`Connected to MongoDB`);
});
connection.on("error", (err) => {
  console.log(`Connection error: ${err.message}`);
});

// starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});
