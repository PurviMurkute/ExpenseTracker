import Transaction from "../models/Transaction.js";
import { flushCache, getCache, createCache } from "../utils/cache.js";

const postTransaction = async (req, res) => {
  const { title, amount, type, category, user } = req.body;
  const userid = req.user._id;

  if (!title || !amount || !type || !category) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "All fields are required",
    });
  }

  const allTransactions = await Transaction.find({ user });

  let income = 0;
  let expense = 0;
  allTransactions.forEach((transaction) => {
    if (transaction.type === "income") {
      income += Number(transaction.amount);
    } else {
      expense += Number(transaction.amount);
    }
  });

  if (type.toLowerCase() === "expense") {
    const balance = income - expense;
    if (balance < Number(amount)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "You do not have enough balance to afford this expense",
      });
    }
  }

  const newTransaction = new Transaction({
    title,
    amount,
    type,
    category,
    user: userid,
  });

  try {
    const savedTransaction = await newTransaction.save();
    await flushCache(`transactions:${userid}`); // Clear cache after saving a new transaction
    console.log(`Cache cleared for transactions of user: ${userid}`);

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
  const { userid } = req.query;

  try {
    let transactions = [];

    const transactionsFromRedis = await getCache(`transactions:${userid}`);
    if (transactionsFromRedis) {
      transactions = transactionsFromRedis;
    } else {
      transactions = await Transaction.find({ user: userid }).sort({
        createdAt: -1,
      });
      await createCache(`transactions:${userid}`, transactions);
    }

    if (transactions.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "No transactions added yet",
      });
    }

    return res.status(200).json({
      success: true,
      data: transactions,
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
  const userid = req.user._id;

  try {
    await Transaction.deleteOne({ _id: id });
    await flushCache(`transactions:${userid}`);
    console.log(`Cache flushed for transactions of user: ${userid}`);

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

const putTransactionbyId = async (req, res) => {
  const { id } = req.params;
  const userid = req.user._id;
  const { title, amount, type, category } = req.body;

  if (!title || !amount || !type || !category) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "All fields are rquired",
    });
  }

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { title, amount, type, category },
      { new: true }
    );
    await flushCache(`transactions:${userid}`);

    return res.status(200).json({
      success: true,
      data: updatedTransaction,
      message: "Transaction updated successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      data: null,
      message: e?.message,
    });
  }
};

export {
  postTransaction,
  getTransactions,
  deleteTransactions,
  putTransactionbyId,
};
