import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { useLocation } from 'react-router';
import DeleteModal from './DeleteModal';
import Button from './Button';

const TransactionCard = ({ _id, title, amount, type, category, createdAt, loadTransactions }) => {
    const [isModelOpen, setIsModalOpen] = useState(false);

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

  const handleDelete = () => {
    deleteTransaction();
    setTimeout(()=>{
      setIsModalOpen(false);
    }, 1000)
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
    <div className="bg-gradient-to-b from-blue-100 to-blue-200  shadow-md rounded-lg p-4 mx-2 md:mx-5 mb-3 flex justify-between items-center hover:shadow-lg">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{category} • {formattedDate}</p>
      </div>
      <div className='flex flex-row'>
        <h4 className={`text-lg font-bold me-2 ${amountColor}`}>₹{amount}</h4>
        <Trash2 className={`${isDashboard? "hidden" : "cursor-pointer w-[20px]" }`} onClick={()=>{setIsModalOpen(true)}}/>
      </div>
      <DeleteModal isOpen={isModelOpen} onClose={()=>{setIsModalOpen(false)}}>
        <div className='flex flex-col p-3'>
          <h3 className='text-center font-medium text-slate-200'>Are you sure you want to delete this transaction?</h3>
          <div className='flex justify-evenly'>
            <Button btnSize="sm" btnText="Delete" btnVariant="red" onClick={handleDelete}/>
            <Button btnSize="sm" btnText="Cancel" btnVariant="green" onClick={()=>{setIsModalOpen(false)}} />
          </div>
        </div>
      </DeleteModal>
      <Toaster/>
    </div>
  );
};

export default TransactionCard;