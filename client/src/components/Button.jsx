import React from "react";
import { motion } from "motion/react";

const Button = ({ btnText, onClick, btnSize }) => {
  const btnSizes = {
    lg: "text-xl px-4 py-2 my-5",
    md: "text-md px-2 py-1",
    sm: "text-md px-4 py-1 my-5 block mx-auto",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className={`font-bold bg-red-600 text-slate-100 cursor-pointer rounded-md md:block ${btnSizes[btnSize]}`}
      onClick={onClick}
    >
      {btnText}
    </motion.button>
  );
};

export default Button;
