import React from 'react'

const FinancialSummaryCard = ({type, amount}) => {
    
    let lable = '';
    let sign = '';
    let color = '';

    if(type === "income"){
        lable = "Total Income"
        sign = "+"
        color = "text-green-700"
    }else if(type === "expense"){
        lable = "Total Expense"
        sign = "-"
        color = "text-red-700"
    }else{
        lable = "Total Balance"
        sign = ""
        color = "text-blue-700"
    }

  return (
    <div className='bg-slate-100 flex flex-col justify-center items-center shadow-md rounded-lg p-3 mx-3 md:mx-8 mb-5 hover:shadow-lg transition'>
          <p className={`text-2xl font-bold ${color}`}>{sign} ₹{amount}</p>
          <h4 className='text-xl font-bold text-slate-900'>{lable}</h4>
        </div>
  )
}

export default FinancialSummaryCard