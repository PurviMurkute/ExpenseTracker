import React from "react";
import { useLocation } from "react-router";

const Input = ({ type, placeholder, value, onChange }) => {
  const location = useLocation();

  const isTransactions = location.pathname.startsWith("/transactions");

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${isTransactions? "w-[60%]": "w-[85%]"} bg-white p-2 my-4 border-2 border-slate-400 shadow-lg block mx-auto rounded-md focus:outline-none`}
    />
  );
};

export default Input;
