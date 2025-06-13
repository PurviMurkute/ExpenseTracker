import Transaction from "../models/Transaction.js";

const postTransaction = async (req, res) => {
  const { title, amount, type, category, user } = req.body;

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

export { postTransaction };
