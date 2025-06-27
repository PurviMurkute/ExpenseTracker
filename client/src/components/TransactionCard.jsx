import axios from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { useLocation } from 'react-router';

const TransactionCard = ({ _id, title, amount, type, category, createdAt, loadTransactions }) => {

  const deleteTransaction = async () => {
    const response = await axios.delete(`${import.meta.env.VITE_API_KEY}/transactions/${_id}`)

    if(response.data.success){
      toast.success(response.data.message);
      setTimeout(()=>{
        loadTransactions();
      }, 1000)
    }else{
      toast.error(response.data.message);
    }
  }

  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  
  const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, 
  });

  const amountColor = type === 'income' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-slate-400 shadow-md rounded-lg p-4 mx-5 mb-3 flex justify-between items-center hover:shadow-lg">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{category} • {formattedDate}</p>
      </div>
      <div className='flex flex-row'>
        <h4 className={`text-lg font-bold me-2 ${amountColor}`}>₹{amount}</h4>
        <Trash2 className={`${isDashboard? "hidden" : "cursor-pointer w-[20px]" }`} onClick={deleteTransaction}/>
      </div>
      <Toaster/>
    </div>
  );
};

export default TransactionCard;