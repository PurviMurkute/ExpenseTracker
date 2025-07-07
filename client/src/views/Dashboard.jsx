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
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router";
import Input from "../components/Input";
import TransactionEmptyView from "../components/TransactionEmptyView";


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
  const [searchText, setSearchText] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("currentuser"));

    if (currentuser) {
      setUser(currentuser);
    }

    if (!currentuser) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (!searchText) {
      setFilteredTransactions(transactions);
      return;
    }

    const tempFilteredTransactions = transactions.filter((transaction) => {
      if (transaction.title.includes(searchText)) {
        return true;
      } else if (transaction.category.includes(searchText)) {
        return true;
      } else if (transaction.amount.toString().includes(searchText)) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredTransactions(tempFilteredTransactions);
  }, [searchText, transactions]);

  const JWT = JSON.parse(localStorage.getItem("JwtToken"));

  const loadTransactions = async () => {
    if (!user._id) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/transactions?userId=${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      if (response.data.success) {
        setTransactions(response.data.data);
      } else toast.error(response.data.message);
    } catch (e) {
      if (e?.response?.data?.message == "jwt expired") {
        localStorage.clear();
        toast.error("JWT expired, please signin again");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
        return;
      }
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [user]);

  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  const isTransactions = location.pathname.startsWith("/transactions");
  const isReports = location.pathname.startsWith("/reports");

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
  //const incomeData = barLabels.map((label) => dailySummary[label].income);
  const expenseData = barLabels.map((label) => dailySummary[label].expense);

  const barData = {
    labels: barLabels,
    datasets: [
      /* {
        label: "Daily Income",
        data: incomeData,
        backgroundColor: "#4ade80",
        categoryPercentage: 0.5,
        barPercentage: 0.8,
      }, */
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
        text: "Daily Expenses",
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
      <Header />
      <div className="bg-gradient-to-b from-blue-100 via-emerald-100 to-blue-200 min-h-screen md:ms-[20%] px-5 py-2 overflow-y-auto">
        <h1 className="mt-15 md:mt-20 text-2xl font-bold md:ms-8 bg-gradient-to-r from-cyan-500 to-blue-400 inline-block text-transparent bg-clip-text px-2 md:pb-2">
          Hello {user.name}!
        </h1>
        <h3
          className={`${
            isDashboard
              ? "text-lg md:text-xl font-medium md:ms-8 text-slate-600 px-2 pb-2"
              : "hidden"
          }`}
        >
          Welcome to ExpenseDiary 😊
        </h3>
        <h3
          className={`${
            isTransactions
              ? "text-lg md:text-xl font-medium md:ms-8 text-slate-600 px-2 pb-2"
              : "hidden"
          }`}
        >
          Here are your Transactions 😊
        </h3>
        <h3
          className={`${
            isReports
              ? "text-lg md:text-xl font-medium md:ms-8 text-slate-600 px-2 pb-2"
              : "hidden"
          }`}
        >
          Here are your transactions reports 😊
        </h3>

        <div className="">
          <div className={`${isDashboard ? "my-2 md:mx-10 " : "hidden"}`}>
            <div className=" shadow-xl bg-white rounded-2xl mb-1">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 p-4 md:ms-6 mb-2">
                Your Financial Summary
              </h1>
              <div className="flex flex-col md:flex-row justify-center">
                <FinancialSummaryCard type="income" amount={netIncome} />
                <FinancialSummaryCard type="expense" amount={netExpense} />
                <FinancialSummaryCard
                  type="balance"
                  amount={netIncome - netExpense}
                />
              </div>
            </div>
            <div className="p-2 shadow-xl bg-white rounded-2xl">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 ms-7 p-2">
                Transactions History
              </h1>
              {transactions.length === 0 ? (
                <TransactionEmptyView />
              ) : (
                <div>
                  <div className="flex flex-row items-center md:justify-center overflow-x-scroll my-4">
                    {[
                      "All",
                      "Salary",
                      "Shopping",
                      "Travel",
                      "Food",
                      "Health",
                      "Learning",
                      "Utilities",
                      "Rent",
                      "Entertainment",
                      "Other",
                    ].map((category, i) => {
                      return (
                        <p
                          className={`text-xs px-2 py-1 me-1 w-[90px] text-center rounded-md cursor-pointer ${
                            category == selectedCategory
                              ? "bg-slate-400"
                              : "bg-slate-200"
                          }`}
                          key={i}
                          onClick={() => {
                            setSelectedCategory(category);
                          }}
                        >
                          {category}
                        </p>
                      );
                    })}
                  </div>
                  {transactions
                    .filter((filteredTransaction) => {
                      if (selectedCategory === "All") return true;
                      const cat = (filteredTransaction.category || "")
                        .toString()
                        .trim()
                        .toLowerCase();
                      return cat === selectedCategory.toLowerCase();
                    })
                    .map((transaction, i) => {
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
              )}
            </div>
          </div>
          <div
            className={`${
              isTransactions
                ? "h-[520px] m-2 md:mx-5 p-2 shadow-xl flex flex-col justify-center bg-white rounded-2xl"
                : "hidden"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 px-5 py-2 md:p-5">
                Recent Transactions
              </h1>
              <Input
                type="text"
                placeholder="Search Transactions..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value.toLowerCase());
                }}
              />
            </div>
            {transactions.length === 0 ? (
              <TransactionEmptyView />
            ) : (
              <div className="overflow-y-scroll h-[400px]">
                {filteredTransactions.map((transaction, i) => {
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
            )}
          </div>
        </div>
        <div
          className={`${
            isReports
              ? "flex flex-col md:flex-row justify-center my-2 bg-white rounded-2xl md:mx-5 p-5"
              : "hidden"
          }`}
        >
          <div className="md:w-[560px] h-[400px] md:h-[450px] bg-slate-300 p-3 md:p-15 md:me-10 my-5">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 pb-2 md:ms-7">
              Summary Visualizations
            </h2>
            <Doughnut data={doughnutData} />
          </div>
          <div className="hidden md:block w-[560px] h-[330px]  md:h-[450px] bg-slate-300 p-4 md:p-15 mx-2 my-5 overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 p-2 md:ms-7">
              Daily Transactions
            </h2>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Dashboard;
