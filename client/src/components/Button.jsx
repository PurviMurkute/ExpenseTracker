import React from "react";
import { motion } from "motion/react";
import { PiExportBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";

const Button = ({ btnText, onClick, btnSize, btnVariant, icon, iconPosition }) => {
  const btnSizes = {
    lg: "text-xl px-4 py-2 mt-7",
    md: "text-md px-5 py-1 my-1",
    sm: "text-md px-4 py-1 my-5 block mx-auto",
    auth_btn: "text-md p-2 my-4 block mx-auto w-[88%] md:w-[83%]"
  };

  const btnVar = {
    red: "bg-red-600",
    green: "bg-green-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    outline: "border-1 bg-slate-100 text-slate-600 hover:shadow-sm"
  };

  const icons = {
    export: <PiExportBold className="inline text-2xl" />,
    google: <FcGoogle className="inline text-2xl me-2"/>
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      className={`font-bold ${btnVar[btnVariant]} text-slate-100 cursor-pointer rounded-md md:block ${btnSizes[btnSize]}`}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && icons[icon]}
      {btnText}
      {icon && iconPosition === "right" && icons[icon]}
    </motion.button>
  );
};

export default Button;
