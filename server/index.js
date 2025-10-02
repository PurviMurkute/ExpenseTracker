import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { verifyJWT } from "./middlewares/jwt.js";
import { generateTransactionPDF } from "./controllers/pdf.js";
import userRouter from "./Routes/userRoutes.js";
import TransactionRouter from "./Routes/transactionRoutes.js";
import passport from "./config/passport.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

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

app.use("/auth", userRouter);
app.use("/user", TransactionRouter);
app.post("/pdf", verifyJWT, generateTransactionPDF);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
