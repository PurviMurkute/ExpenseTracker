import React from "react";

const FeatureCard = ({ icon, title, description, className }) => {
  return (
    <div>
      <div
        className={`${className} w-[270px] md:w-[350px] px-6 py-4 md:p-8 md:mx-4 my-3 shadow-md flex flex-col justify-center items-center rounded-xl hover:animate-pulse`}
      >
        <p>{icon}</p>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-lg text-center font-medium ">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
