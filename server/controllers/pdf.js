import PDFDocument from "pdfkit";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const generateTransactionPDF = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "User not found",
      });
    }

    const allTransaction = await Transaction.find({ user: userId }).sort({
      createdAt: -1,
    });

    console.log("Transactions fetched:", allTransaction.length);

    const doc = new PDFDocument({ margin: 30, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${user.name}_transactions.pdf`
    );
    // These headers tell browser: "This is a PDF file, download it as attachment"

    doc.pipe(res); // Pipe PDF output to the HTTP response

    doc
      .fillColor("black")
      .fontSize(20)
      .text(`${user.name}'s Transaction History`, { align: "center" });

    doc.moveDown(1); // Adds vertical space after the title

    let totalIncome = 0;
    let totalExpense = 0;

    allTransaction.forEach((transaction) => {
      if (transaction.type.toLowerCase() === "income") {
        totalIncome += transaction.amount;
      } else if (transaction.type.toLowerCase() === "expense") {
        totalExpense += transaction.amount;
      }
    });

    const totalBalance = totalIncome - totalExpense;

    doc
      .fontSize(14)
      .fillColor("black")
      .text(`Total Balance: ₹${totalBalance}`, { align: "center" })
      .text(`Total Income: ₹${totalIncome}`, { align: "center" })
      .text(`Total Expense: ₹${totalExpense}`, { align: "center" });

    doc.moveDown(2);

    if (allTransaction.length === 0) {
      doc.fontSize(14).fillColor("black").text("No transactions found.");
    } else {
      allTransaction.forEach((transaction, i) => {
        const isIncome = transaction.type.toLowerCase() === "income";
        const typeColor = isIncome ? "green" : "red";
        const typeText = isIncome ? "Income" : "Expense";
        const formattedDate = new Date(
          transaction.createdAt
        ).toLocaleDateString();

        doc
          .fontSize(12)
          .fillColor("black")
          .text(`${i + 1}. ₹${transaction.amount} - ${transaction.title} | `, {
            continued: true,
          })
          .fillColor(typeColor)
          .text(`${typeText}`, { continued: true })
          .fillColor("black")
          .text(` | ${formattedDate}`);
      });
    }

    doc.end(); // Close and finalize the PDF
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e?.message || "Failed to generate PDF",
    });
  }
};
