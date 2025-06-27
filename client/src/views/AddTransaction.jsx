import React, { useEffect, useState } from "react";
import Header from "./../components/Header.jsx";
import Input from "../components/Input.jsx";
import axios from "axios";
import Button from "../components/Button.jsx";
import toast, { Toaster } from "react-hot-toast";
import transactions from "./../assets/transactions.png";

const AddTransaction = () => {
  const [userData, setUserData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    user: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));

    if (currentUser) {
      setUserData(currentUser);
    }
    if (!currentUser) {
      window.location.href = "/signin";
    }
  }, []);

  const JWT = JSON.parse(localStorage.getItem("JwtToken"));

  const addTransactions = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/transactions`,
        {
          title: userData.title,
          amount: userData.amount,
          type: userData.type,
          category: userData.category,
          user: userData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      if (response.data.success) {
        setUserData(response.data.data);
        toast.success(response.data.message);

        setUserData({
          title: "",
          amount: "",
          type: "",
          category: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      if (e?.response?.data?.message == "jwt expired") {
        localStorage.clear();
        toast.error("JWT expired, please signin again");
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
        return;
      }
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-500">
      <Header />
      <div className="ms-[20%] fixed inset-0">
        <div className="ms-[8%]">
          <h1 className="mt-20 text-2xl font-bold text-slate-100 px-2 pb-2">
            Hello {userData.name}👋🏻
          </h1>
          <h3 className="text-lg font-medium text-slate-100 px-2 pb-4">
            Add. Save. Repeat. Build Better Financial Habits!😊
          </h3>
        </div>
        <div className="md:w-[1050px] ms-[8%] p-5 flex justify-center items-center shadow-xl rounded-md bg-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-[300px] md:w-[420px] bg-slate-400 py-5 px-2 shadow-xl my-2 me-4 rounded-md"
          >
            <h3 className="font-bold text-slate-900 py-3 text-2xl text-center">
              Add Transactions
            </h3>
            <Input
              type="text"
              placeholder="Title"
              value={userData.title}
              onChange={(e) =>
                setUserData({ ...userData, title: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Amount"
              value={userData.amount}
              onChange={(e) =>
                setUserData({ ...userData, amount: e.target.value })
              }
            />
            <select
              value={userData.type}
              onChange={(e) =>
                setUserData({ ...userData, type: e.target.value })
              }
              className="bg-white p-2 my-4 border-2 border-slate-400 shadow-lg w-[85%] block mx-auto rounded-md focus:outline-none"
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <select
              value={userData.category}
              onChange={(e) =>
                setUserData({ ...userData, category: e.target.value })
              }
              className="bg-white p-2 my-4 border-2 border-slate-400 shadow-lg w-[85%] block mx-auto rounded-md focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="salary">Salary</option>
              <option value="shopping">Shopping</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="health">Health</option>
              <option value="learning">Learning</option>
              <option value="utilities">Utilities</option>
              <option value="rent">Rent</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>

            <Button
              btnText="Add Transaction"
              btnSize="sm"
              onClick={addTransactions}
            />
            <Button
              btnText="Check Transactions"
              btnSize="sm"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            />
          </form>
          <div className="w-[300px] md:w-[420px] px-5">
            <h3 className="text-xl font-bold text-center text-slate-800">
              Track Every Rupee with Ease
            </h3>
            <img
              src={transactions}
              alt="transaction-img"
              className="w-[300px] block mx-auto"
            />
            <p className="text-md text-center text-slate-800">
              Keeping an accurate transaction history is the first step toward
              smarter money management. Fill out the details below to add a new
              income or expense entry. This will reflect in your financial
              summary and reports instantly.
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddTransaction;
