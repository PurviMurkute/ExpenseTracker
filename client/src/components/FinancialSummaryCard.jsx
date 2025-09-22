import React from "react";
import Loader from "./Loader";

const FinancialSummaryCard = ({ type, amount, loading }) => {
  let lable = "";
  let sign = "";
  let color = "";

  if (type === "income") {
    lable = "Total Income";
    sign = "+";
    color = "text-green-700";
  } else if (type === "expense") {
    lable = "Total Expense";
    sign = "-";
    color = "text-red-700";
  } else {
    lable = "Total Balance";
    sign = "";
    color = "text-blue-700";
  }

  return (
    <div className="md:w-[320px] bg-gradient-to-b from-blue-100 to-blue-200  flex flex-col justify-center items-center shadow-sm rounded-lg py-3 md:py-6 mx-3 mb-5 hover:shadow-lg transition">
      {loading ? (
        <Loader loaderWithText={false} />
      ) : (
        <p className={`text-xl md:text-xl font-bold ${color}`}>
          {sign} ₹{amount}
        </p>
      )}
      <h4 className="text-xl md:text-xl font-bold text-slate-900">{lable}</h4>
    </div>
  );
};

export default FinancialSummaryCard;
