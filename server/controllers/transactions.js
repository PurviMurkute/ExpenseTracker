import Transaction from "../models/Transaction.js";
import User from "./../models/User.js";

const postTransaction = async (req, res) => {
  const { title, amount, type, category, user } = req.body;

  if (!title || !amount || !type || !category || !user) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "All fields are required",
    });
  }

  const newTransaction = new Transaction({
    title,
    amount,
    type,
    category,
    user,
  });

  try {
    const savedTransaction = await newTransaction.save();

    return res.status(201).json({
      success: true,
      data: savedTransaction,
      message: "Transaction Successfull",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e.message,
    });
  }
};

const getTransactions = async (req, res) => {
  const { userId } = req.query;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      data: null,
      message: "User not found",
    });
  }

  try {
    const allTransaction = await Transaction.find({ user: userId }).sort({
      createdAt: -1,
    });

    if (allTransaction == 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No transactions added yet",
      });
    }

    return res.status(200).json({
      success: true,
      data: allTransaction,
      message: "Transactions fetched successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e.message,
    });
  }
};

const deleteTransactions = async (req, res) => {
  const { id } = req.params;

  try {
    await Transaction.deleteOne({ _id: id });
  
    return res.status(200).json({
      success: true,
      data: null,
      message: "Transaction deleted successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e.message,
    });
  }
};

export { postTransaction, getTransactions, deleteTransactions };
