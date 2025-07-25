import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, width, children }) => {
  if (!isOpen) {
    return null;
  }

  const modelWidth = {
    sm: "w-[250px] md:w-[400px]",
    md: "w-[300px] md:w-[500px]"
  }

  return (
    <div className="bg-gray-600/50 flex justify-center items-center inset-0 fixed min-h-screen">
      <div className={`${modelWidth[width]} bg-slate-700/70 relative px-10 pt-5 rounded-md shadow-xl`}>
        <X color="#fff" className="absolute top-2 right-2" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
