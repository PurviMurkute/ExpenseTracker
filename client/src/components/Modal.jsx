import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, width, children }) => {
  if (!isOpen) return null;

  const modelWidth = {
    sm: "w-[250px] md:w-[400px]",
    md: "w-[300px] md:w-[500px]"
  }

  return (
    <div className="fixed inset-0 min-h-screen bg-black/50 flex justify-center items-center">
      <div className={`${modelWidth[width]} w-[310px] md:w-[450px] bg-white px-8 py-8 rounded-lg shadow-md relative`}>
        <IoClose className="absolute top-2 right-2 cursor-pointer w-[25px] h-[25px] text-gray-700" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
