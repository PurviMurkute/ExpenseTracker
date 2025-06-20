import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TransactionCard from "../components/TransactionCard";
import FinancialSummaryCard from "../components/FinancialSummaryCard";
import Header from "../components/Header";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("currentuser"));

    if (currentuser) {
      setUser(currentuser);
    }

    if (!currentuser) {
      window.location.href = "/signin";
    }
  }, []);

  const loadTransactions = async () => {
    if (!user._id) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/transactions?userId=${user._id}`
      );

      console.log(response.data.data);

      if (response.data.success) {
        toast.loading("Loading transactions...");

        setTimeout(() => {
          setTransactions(response.data.data);
        }, 3000);
        toast.dismiss();
      } else toast.error(response.data.message);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [user]);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type == "income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }

      setNetIncome(income);
      setNetExpense(expense);
    });
  }, [transactions]);

  return (
    <div className="bg-slate-600 min-h-screen inset-0 fixed">
      <Header />
      <h1 className="mt-20 text-3xl font-extrabold text-center text-slate-100 pb-2">
        Hello {user.name}👋🏻
      </h1>
      <h3 className="text-2xl font-bold text-center text-slate-100 pb-2">
        Welcome to ExpenseDiary!😊
      </h3>

      <div className="flex justify-center">
        <div className="w-[600px] h-[500px] my-5 mx-5 p-2 shadow-xl flex flex-col justify-center bg-slate-300 rounded-2xl">
          <h1 className="text-2xl font-bold text-slate-900 p-4 ms-7 mb-2">
            Your Financial Summary
          </h1>
          <FinancialSummaryCard type="income" amount={netIncome} />
          <FinancialSummaryCard type="expense" amount={netExpense} />
          <FinancialSummaryCard
            type="balance"
            amount={netIncome - netExpense}
          />
        </div>
        <div className="w-[600px] h-[500px] my-5 mx-5 p-2 shadow-xl flex flex-col justify-center bg-slate-300 rounded-2xl">
          <h1 className="text-2xl font-bold text-slate-900 p-4">
            Recent Transactions
          </h1>
          <div className="overflow-y-scroll">
            {transactions.map((transaction, i) => {
              const { _id, title, amount, type, category, createdAt } =
                transaction;
              return (
                <TransactionCard
                  key={i}
                  _id={_id}
                  title={title}
                  amount={amount}
                  type={type}
                  category={category}
                  createdAt={createdAt}
                  loadTransactions={loadTransactions}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;
