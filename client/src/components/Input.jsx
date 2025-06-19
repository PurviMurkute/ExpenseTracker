import React from "react";

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-white p-2 my-4 border-2 border-slate-400 shadow-lg w-[85%] block mx-auto rounded-md focus:outline-none"
    />
  );
};

export default Input;
