import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";

const Loader = ({ loaderWithText }) => {
  return (
    <div className={`flex items-center justify-center ${loaderWithText? "h-[200px]" : "h-[70px]"} `}>
        {loaderWithText? <VscLoading className="animate-spin w-5 h-5"/>: <AiOutlineLoading3Quarters  className="animate-spin"/>}
      {loaderWithText === true ? (
        <p className="ml-4 text-md">Loading Transactions</p>
      ) : null}
    </div>
  );
};

export default Loader;
