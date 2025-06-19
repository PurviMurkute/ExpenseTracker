import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import TransactionCard from '../components/TransactionCard';

const Dashboard = () => {

  const [ user, setUser ] = useState('');
  const [ transactions, setTransactions ] = useState([]);

  useEffect(()=>{
    const currentuser = JSON.parse(localStorage.getItem("currentuser"));

    if(currentuser){
      setUser(currentuser);
    }

    if(!currentuser){
      window.location.href = '/signin';
    }
  }, [])

  const loadTransactions = async () => {
    if(!user._id) return;

    try{
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/transactions?userId=${user._id}`)

    console.log(response.data.data);

    if(response.data.success){
      toast.loading("Loading transactions...");

      setTimeout(()=>{
        setTransactions(response.data.data);
      }, 3000)
      toast.dismiss();
    }else(
      toast.error(response.data.message)
    )}catch(e){
      toast.error(e.response.data.message);
    }
  }

  const handleSignOut = () => {
    localStorage.clear();
    toast.success("SignOut Successful")

    setTimeout(()=>{
      window.location.href = '/signin';
    }, 2000)
  }

  useEffect(()=>{
    loadTransactions();
  }, [user])
  return (
    <div className='bg-slate-300 min-h-screen inset-0 fixed'>
      <div className='h-[50px] bg-slate-900 w-full top-0 fixed'>
        <button className='fixed top-2 right-2 bg-red-700 px-3 py-1 m-1 text-slate-100 text-md font-medium' onClick={handleSignOut}>SignOut</button>
      </div>
      <h1 className='mt-20 text-3xl font-extrabold text-center text-slate-900 pb-2'>Hello {user.name}👋🏻</h1>
      <div className='w-[500px] h-[500px] my-5 mx-10 p-2 shadow-xl flex flex-col justify-center overflow-y-scroll bg-white'>
        <h1 className='text-2xl font-bold text-slate-900 p-4'>Recent Transactions</h1>
      {
        transactions.map((transaction, i)=>{
          const {_id, title, amount, type, category, createdAt} = transaction;
          return(
            <TransactionCard 
            _id={_id}
            title={title}
            amount={amount}
            type={type}
            category={category}
            createdAt={createdAt}
            />
          )
        })
      }
      </div>
      <Toaster/>
    </div>
  )
}

export default Dashboard