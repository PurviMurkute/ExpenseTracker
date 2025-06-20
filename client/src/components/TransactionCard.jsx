import axios from 'axios';
import React from 'react';

const TransactionCard = ({ _id, title, amount, type, category, createdAt }) => {

  
  
  const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const amountColor = type === 'income' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-slate-100 shadow-md rounded-lg p-4 mx-4 mb-3 flex justify-between items-center hover:shadow-lg transition">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{category} • {formattedDate}</p>
      </div>
      <div className={`text-lg font-bold ${amountColor}`}>
        ₹{amount}
      </div>
    </div>
  );
};

export default TransactionCard;
