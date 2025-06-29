import React from "react";

const WorkflowCard = ({ img, title, description, reverse, step }) => {
  return (
    <div
      className={`flex flex-col md:flex-row justify-center items-center ${
        reverse ? "md:flex-row-reverse" : ""
      } bg-slate-300 px-5 py-4 md:py-0 my-2 rounded-xl`}
    >
      <img src={img} alt="workflow-img" className="w-[300px]" />
      <div>
        <h2 className="text-lg font-medium py-1">Step {step}</h2>
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <p className="text-md">{description}</p>
      </div>
    </div>
  );
};

export default WorkflowCard;
