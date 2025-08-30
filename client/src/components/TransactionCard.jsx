import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, SquarePen } from "lucide-react";
import { useLocation } from "react-router";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

const TransactionCard = ({
  _id,
  title,
  amount,
  type,
  category,
  createdAt,
  loadTransactions,
}) => {
  const [isDeleteModelOpen, setIsDeleteModalOpen] = useState(false);
  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const JWT = localStorage.getItem("JwtToken");

  const deleteTransaction = async () => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_KEY}/user/transactions/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setTimeout(() => {
        loadTransactions();
      }, 1000);
    } else {
      toast.error(response.data.message);
    }
  };

  const updateTransaction = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/user/transaction/${_id}`,
        {
          title: transaction.title,
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category,
        }, 
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      if (response.data.success) {
        setTransaction(response.data.data);
        setIsUpdateModalOpen(false);
        loadTransactions();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.message);
    }
  };

  const handleDelete = () => {
    deleteTransaction();
    setTimeout(() => {
      setIsDeleteModalOpen(false);
    }, 1000);
  };

  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const amountColor = type === "income" ? "text-green-600" : "text-red-600";

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200  shadow-md rounded-lg p-4 mx-2 md:mx-5 mb-3 flex justify-between items-center hover:shadow-lg">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">
          {category} • {formattedDate}
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <h4 className={`text-lg font-bold me-2 ${amountColor}`}>₹{amount}</h4>
        <SquarePen
          className={`${isDashboard ? "hidden" : "cursor-pointer w-[20px]"}`}
          onClick={() => {
            setTransaction({ title, amount, type, category });
            setIsUpdateModalOpen(true);
          }}
        />
        <Trash2
          className={`${isDashboard ? "hidden" : "cursor-pointer w-[20px]"}`}
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
        />
      </div>
      <Modal
        isOpen={isDeleteModelOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        width="sm"
      >
        <div className="flex flex-col p-3">
          <h3 className="text-center font-medium text-slate-200">
            Are you sure you want to delete this transaction?
          </h3>
          <div className="flex justify-evenly">
            <Button
              btnSize="sm"
              btnText="Delete"
              btnVariant="red"
              onClick={handleDelete}
            />
            <Button
              btnSize="sm"
              btnText="Cancel"
              btnVariant="green"
              onClick={() => {
                setIsDeleteModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
        }}
        width="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }} className="px-0 md:px-3 py-5"
        >
          <Input
            type="text"
            placeholder="title"
            value={transaction.title}
            onChange={(e) =>
              setTransaction({ ...transaction, title: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="amount"
            value={transaction.amount}
            onChange={(e) =>
              setTransaction({ ...transaction, amount: e.target.value })
            }
          />
          <select
            value={transaction.type}
            onChange={(e) =>
              setTransaction({ ...transaction, type: e.target.value })
            }
            className="bg-white p-2 my-4 border-2 border-slate-400 shadow-lg w-[90%] md:w-[85%] block mx-auto rounded-md focus:outline-none"
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={transaction.category}
            onChange={(e) =>
              setTransaction({ ...transaction, category: e.target.value })
            }
            className="bg-white p-2 my-4 border-2 border-slate-400 shadow-lg w-[90%] md:w-[85%] block mx-auto rounded-md focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="salary">💰Salary</option>
            <option value="shopping">🛍️Shopping</option>
            <option value="travel">✈️Travel</option>
            <option value="food">🍝Food</option>
            <option value="health">❤️‍🩹Health</option>
            <option value="learning">🌱Learning</option>
            <option value="utilities">⭐Utilities</option>
            <option value="rent">💲Rent</option>
            <option value="entertainment">🎀Entertainment</option>
            <option value="other">Other</option>
          </select>
          <Button
            btnText="Update Transaction"
            btnSize="sm"
            btnVariant="green"
            onClick={updateTransaction}
          />
        </form>
      </Modal>
      <Toaster />
    </div>
  );
};

export default TransactionCard;
