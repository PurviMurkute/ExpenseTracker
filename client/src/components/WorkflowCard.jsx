import React from "react";
import { motion } from "motion/react";

const WorkflowCard = ({ img, title, description, reverse, step, bgColor }) => {
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
      className={`flex flex-col md:flex-row justify-center items-center ${
        reverse ? "md:flex-row-reverse" : ""
      } ${bgColors[bgColor]} px-5 md:px-10 py-4 md:py-0 my-1 rounded-xl`}
    >
      <img src={img} alt="workflow-img" className="w-[250px]" />
      <div>
        <h2 className="text-lg font-medium py-1">Step {step}</h2>
        <h2 className="text-lg md:text-xl font-bold">{title}</h2>
        <p className="text-md">{description}</p>
      </div>
    </motion.div>
  );
};

export default WorkflowCard;
