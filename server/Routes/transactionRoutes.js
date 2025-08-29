import express from "express";
import {
  postTransaction,
  getTransactions,
  deleteTransactions,
  putTransactionbyId,
} from "../controllers/transactions.js";
import { verifyJWT } from "../middlewares/jwt.js";

const TransactionRouter = express.Router();

TransactionRouter.post("/transactions", verifyJWT, postTransaction);
TransactionRouter.get("/transactions", verifyJWT, getTransactions);
TransactionRouter.delete("/transactions/:id", verifyJWT, deleteTransactions);
TransactionRouter.put("/transaction/:id", verifyJWT, putTransactionbyId);

export default TransactionRouter;