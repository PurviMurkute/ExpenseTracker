import React from "react";
import { motion } from "motion/react";

const Button = ({ btnText, onClick, btnSize, btnVariant }) => {
  const btnSizes = {
    lg: "text-xl px-4 py-2 mt-7",
    md: "text-md px-5 py-1 my-1",
    sm: "text-md px-4 py-1 my-5 block mx-auto",
    auth_btn: "text-md p-2 my-6 block mx-auto w-[83%] hover:bg-blue-600"
  };

  const btnVar = {
    red: "bg-red-600",
    green: "bg-green-600",
    blue: "bg-blue-500"
  }

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className={`font-bold ${btnVar[btnVariant]} text-slate-100 cursor-pointer rounded-md md:block ${btnSizes[btnSize]}`}
      onClick={onClick}
    >
      {btnText}
    </motion.button>
  );
};

export default Button;
