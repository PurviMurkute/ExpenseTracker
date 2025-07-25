import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { postSignUp, postLogin, putUserProfile, putPassword, deleteAccount } from "./controllers/user.js";
import {
  postTransaction,
  getTransactions,
  deleteTransactions,
  putTransactionbyId,
} from "./controllers/transactions.js";
import jwt from "jsonwebtoken";

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

const verifyJWT = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Authorization is required",
    });
  }

  try {
    const jwtToken = authorization.split(" ")[1];
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e.message,
    });
  }
};

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.post("/signup", postSignUp);
app.post("/login", postLogin);
app.post("/transactions", verifyJWT, postTransaction);
app.get("/transactions", getTransactions);
app.delete("/transactions/:id", deleteTransactions);
app.put("/transaction/:id", putTransactionbyId);
app.put("/profile/:userid", putUserProfile);
app.put("/password/:userid", putPassword);
app.delete("/account/:userid", deleteAccount);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});
