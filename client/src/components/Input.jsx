import React from "react";

const Input = ({ type, placeholder, value, onChange}) => {

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-[90%] md:w-[85%] bg-white p-2 my-4 border-2 border-slate-200 shadow-lg block mx-auto rounded-md focus:outline-none `}
    />
  );
};

export default Input;
