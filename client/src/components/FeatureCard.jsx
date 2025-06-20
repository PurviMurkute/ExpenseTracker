import React from "react";

const FeatureCard = ({ icon, title, description, className }) => {
   
  return (
    <div>
      <div className={`${className} w-[350px] p-8 mx-4 my-3 shadow-md flex flex-col justify-center items-center rounded-xl hover:animate-pulse`}>
        <p>{icon}</p>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-lg font-medium ">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
