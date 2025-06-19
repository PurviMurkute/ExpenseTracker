import { Link } from "react-router";
import logo from "./../assets/logo.png";
import { LogIn } from "lucide-react";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { SquarePlus } from "lucide-react";

const Header = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));

    if (currentUser) {
      setCurrentUser(currentUser);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    toast.success("SignOut successful");
    setTimeout(() => {
      window.location.href = "/signin";
    }, 3000);
  };

  return (
    <div className="fixed bg-slate-900 pt-3 pb-2 w-full px-2 flex justify-between z-10 text-white">
      <div>
        <h1 className="font-bold text-4xl font-serif">
          <img src={logo} alt="logo" className="w-[50px] inline" /> ExpenseDiary
        </h1>
      </div>
      <div className="mt-3 me-5">
        {!currentUser ? (
          <>
            <Link
              to="/signin"
              className="font-bold text-md me-5 cursor-pointer"
            >
              <LogIn className="w-[40px] inline" />
              SignIn
            </Link>
            <Link to="/signup">
              <Button btnText="SignUp Now" btnSize="md" />
            </Link>
          </>
        ) : (
          <div className="flex flex-row">
            <Link to='/addtransactions'>
              <SquarePlus
                color="#e3e4e8"
                className="w-[40px] fixed top-8 right-30 cursor-pointer"
              />
            </Link>
            <Button btnText="SignOut" btnSize="md" onClick={handleSignOut} />
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Header;
