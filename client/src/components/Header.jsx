import { Link } from "react-router";
import logo from "./../assets/logo.png";
import { LogIn } from 'lucide-react';
import Button from "./Button";

const Header = () => {
  return (
    <div className="fixed bg-slate-900 pt-3 pb-2 w-full px-2 flex justify-between z-10 text-white">
      <div>
        <h1 className="font-bold text-4xl font-serif">
          <img src={logo} alt="logo" className="w-[50px] inline" /> ExpenseDiary
        </h1>
      </div>
      <div className="mt-3 me-5">
        <Link to='/signin' className="font-bold text-md me-5 cursor-pointer"><LogIn className="w-[40px] inline"/>SignIn</Link>
        <Link to='/signup'><Button btnText="SignUp Now" btnSize="md"/></Link>
      </div>
    </div>
  );
};

export default Header;
