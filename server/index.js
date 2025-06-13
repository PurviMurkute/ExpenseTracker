import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { postSignUp, postLogin } from "./controllers/user.js";
import { postTransaction } from "./controllers/transactions.js";

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);

  if (conn) {
    console.log("MongoDB Connected");
  } else {
    console.log("MongoDB Connection Failed");
  }
};

const PORT = process.env.PORT || 5001;

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.post("/signup", postSignUp);
app.post("/login", postLogin);
app.post('/transactions', postTransaction);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
