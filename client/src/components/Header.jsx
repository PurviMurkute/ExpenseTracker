import { Link } from "react-router";
import logo from "./../assets/logo.png";
import { LogIn } from 'lucide-react';

const Header = () => {
  return (
    <div className="fixed bg-slate-900 pt-3 pb-1 w-full px-2 flex justify-between z-10 text-white">
      <div>
        <h1 className="font-bold text-4xl font-serif">
          <img src={logo} alt="logo" className="w-[50px] inline" /> ExpenseDiary
        </h1>
      </div>
      <div className="mt-3 me-5">
        <Link to='/signin' className="font-bold underline text-md me-5 cursor-pointer"><LogIn className="w-[40px] inline"/>SignIn</Link>
        <Link to='/signup' className="font-bold text-md bg-red-700 px-3 py-2 cursor-pointer">SignUp Now</Link>
      </div>
    </div>
  );
};

export default Header;
