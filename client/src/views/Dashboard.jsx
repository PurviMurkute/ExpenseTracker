import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TransactionCard from "../components/TransactionCard";
import FinancialSummaryCard from "../components/FinancialSummaryCard";
import Header from "../components/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // for Doughnut
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Footer from "../components/Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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

  const dailySummary = {};
  transactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    if (!dailySummary[date]) dailySummary[date] = { income: 0, expense: 0 };
    if (transaction.type === "income")
      dailySummary[date].income += transaction.amount;
    else dailySummary[date].expense += transaction.amount;
  });

  const barLabels = Object.keys(dailySummary).sort();
  const incomeData = barLabels.map((label) => dailySummary[label].income);
  const expenseData = barLabels.map((label) => dailySummary[label].expense);

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: "Daily Income",
        data: incomeData,
        backgroundColor: "#4ade80",
        categoryPercentage: 0.5,
        barPercentage: 0.8,
      },
      {
        label: "Daily Expense",
        data: expenseData,
        backgroundColor: "#f87171",
        categoryPercentage: 0.5,
        barPercentage: 0.8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Daily Transactions",
      },
    },
  };

  const doughnutData = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        label: "Views",
        data: [netIncome, netExpense, netIncome - netExpense],
        borderColor: ["#065f46", "#7f1d1d", "#1e40af"],
        backgroundColor: ["#4ade80", "#f87171", "#60a5fa"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="bg-slate-700 min-h-screen overflow-y-auto">
        <Header />
        <h1 className="mt-20 text-2xl md:text-3xl font-extrabold text-center text-slate-100 px-2 pb-2">
          Hello {user.name}👋🏻
        </h1>
        <h3 className="text-xl font-bold text-center text-slate-100 px-2 pb-2">
          Welcome to ExpenseDiary!😊
        </h3>

        <div className="flex flex-col md:flex-row justify-center">
          <div className="md:w-[600px] h-[450px] md:h-[500px] my-5 mx-2 md:mx-5 p-2 shadow-xl flex flex-col justify-center bg-slate-100 rounded-2xl">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 p-4 md:ms-7 mb-2">
              Your Financial Summary
            </h1>
            <FinancialSummaryCard type="income" amount={netIncome} />
            <FinancialSummaryCard type="expense" amount={netExpense} />
            <FinancialSummaryCard
              type="balance"
              amount={netIncome - netExpense}
            />
          </div>
          <div className="md:w-[600px] h-[450px] md:h-[500px] my-5 mx-2 md:mx-5 p-2 shadow-xl flex flex-col justify-center bg-slate-100 rounded-2xl">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 p-4">
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
        <div className="flex flex-col md:flex-row justify-center my-5 md:mx-10">
          <div className="md:w-[600px] h-[350px] md:h-[450px] bg-slate-100 p-10 md:p-15 mx-2 rounded-2xl md:me-10 my-5">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 pb-2 md:ms-7">
              Summary Visualizations
            </h2>
            <Doughnut data={doughnutData} />
          </div>
          <div className="md:w-[600px] h-[350px]  md:h-[450px] bg-slate-100 p-10 md:p-15 mx-2 rounded-2xl my-5 overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 p-2 md:ms-7">
              Daily Transactions
            </h2>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
        <Toaster />
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
