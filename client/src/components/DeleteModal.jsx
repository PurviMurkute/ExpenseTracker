import { X } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, children }) => {
    if(!isOpen){
        return null;
    }
  return (
    <div className='bg-gray-600/50 flex justify-center items-center inset-0 fixed min-h-screen'>
        <div className='w-[300px] md:w-[400px] bg-slate-700/70 relative px-10 pt-5 rounded-md shadow-xl'>
            <X color='#fff' className='absolute top-1 right-1' onClick={onClose}/>
            {children}
        </div>
    </div>
  )
}

export default DeleteModal