import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from './../assets/logo.png';
import toast, { Toaster } from "react-hot-toast";
import TransactionCard from "../components/TransactionCard";
import FinancialSummaryCard from "../components/FinancialSummaryCard";

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

  const handleSignOut = () => {
    localStorage.clear();
    toast.success("SignOut Successful");

    setTimeout(() => {
      window.location.href = "/signin";
    }, 2000);
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
    <div className="bg-slate-300 min-h-screen inset-0 fixed">
      <div className="h-[50px] bg-slate-900 w-full top-0 fixed">
        <h1 className="font-bold text-2xl font-serif  text-slate-100 p-2">
          <img src={logo} alt="logo" className="w-[40px] inline" /> ExpenseDiary
        </h1>
        <button
          className="fixed top-2 right-2 bg-red-700 px-3 py-1 m-1 text-slate-100 text-md font-medium"
          onClick={handleSignOut}
        >
          SignOut
        </button>
      </div>
      <h1 className="mt-20 text-3xl font-extrabold text-center text-slate-900 pb-2">
        Hello {user.name}👋🏻
      </h1> 
      <h3 className="text-2xl font-bold text-center text-slate-900 pb-2">
        Welcome to ExpenseDiary!😊
      </h3>

      <div className="flex justify-evenly">
        <div className="w-[550px] h-[500px] my-5 mx-10 p-2 shadow-xl flex flex-col justify-center bg-white rounded-2xl">
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
        <div className="w-[550px] h-[500px] my-5 mx-10 p-2 shadow-xl flex flex-col justify-center overflow-y-scroll bg-white rounded-2xl">
          <h1 className="text-2xl font-bold text-slate-900 p-4">
            Recent Transactions
          </h1>
          {transactions.map((transaction, i) => {
            const { _id, title, amount, type, category, createdAt } =
              transaction;
            return (
              <TransactionCard
                _id={_id}
                title={title}
                amount={amount}
                type={type}
                category={category}
                createdAt={createdAt}
              />
            );
          })}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;
