import React, { useEffect, useState } from "react";
import Header from "./../components/Header.jsx";
import Input from "../components/Input.jsx";
import axios from "axios";
import Button from "../components/Button.jsx";
import toast, { Toaster } from "react-hot-toast";

const AddTransaction = () => {
  const [userData, setUserData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    user: "",
  });

  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));
   

    if(currentUser){
      setUserData(currentUser);
    }
    if(!currentUser){
      window.location.href = '/signin'
    }
  }, [])

  const addTransactions = async () => {
    try{
    const JWT = JSON.parse(localStorage.getItem("JwtToken"));
    
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
          Authorization: `Bearer ${JWT}`
        }
      }
    );

    if(response.data.success){
      setUserData(response.data.data)
      toast.success(response.data.message);

      setUserData({
        title: "",
        amount: "",
        type: "",
        category: ""
      })
    }else{
      toast.error(response.data.message);
    }
  }catch(e){
    toast.error(e?.response?.data?.message || e?.message);
  }
  };

  return (
    <div className="min-h-screen bg-slate-600">
      <Header />
      <div className="inset-0 fixed flex justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="w-[300px] md:w-[420px] block mx-auto bg-slate-400 py-5 px-2 shadow-xl my-2 rounded-md"
        >
          <h3 className="font-bold text-slate-900 py-3 text-2xl text-center">Add Transactions</h3>
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
            onChange={(e) => setUserData({ ...userData, type: e.target.value })}
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

          <Input type="text" value={userData._id} disable/>

          <Button
            btnText="Add Transaction"
            btnSize="sm"
            onClick={addTransactions}
          />
        </form>
      </div>
      <Toaster/>
    </div>
  );
};

export default AddTransaction;
