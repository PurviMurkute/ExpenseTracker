import React from "react";
import { motion } from "motion/react";

const WorkflowCard = ({ title, description, step, bgColor }) => {
  const bgColors = {
    color1 : "bg-red-100 text-red-700",
    color2 : "bg-blue-100 text-blue-700",
    color3 : "bg-fuchsia-100 text-fuchsia-700"
  }
  
  return (
    <motion.div
      initial={{ y: 30 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
      className={`flex flex-col justify-center items-center bg-slate-600/60 px-5 md:px-7 py-8 md:py-3 my-3 md:my-2 w-[275px] md:h-[250px] md:w-[400px] rounded-md hover:shadow-xl`}
    >
      <div className={`w-[50px] h-[50px] mx-5 rounded-full flex justify-center items-center ${bgColors[bgColor]} text-2xl font-bold`}>
        {step}
      </div>
      <div>
        <h2 className="text-lg text-slate-100 text-center md:text-xl pb-3 font-bold">{title}</h2>
        <p className="text-md text-slate-100 text-center">{description}</p>
      </div>
      
    </motion.div>
  );
};

export default WorkflowCard;
