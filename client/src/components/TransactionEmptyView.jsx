import React from "react";
import Button from "./Button";

const TransactionEmptyView = () => {
  return (
    <div className="flex flex-col justify-center items-center px-3 my-5 md:my-20">
      <p className="text-md md:text-xl font-medium text-center text-red-500">
        Oops.. No transactions added yet
      </p>
      <Button btnText="Add Transactions Now" btnSize="sm" onClick={()=>{window.location.href= '/addtransactions'}}/>
    </div>
  );
};

export default TransactionEmptyView;
