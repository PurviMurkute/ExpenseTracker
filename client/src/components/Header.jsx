import { Link } from "react-router";
import logo from "./../assets/logo.png";
import { LogIn } from "lucide-react";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { SquarePlus } from "lucide-react";
import user from "./../assets/user.png";

const Header = () => {
  const [currentUser, setCurrentUser] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDrpdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        <h1 className="font-bold text-2xl md:text-4xl font-serif">
          <img src={logo} alt="logo" className="w-[35px] md:w-[50px] inline" />{" "}
          ExpenseDiary
        </h1>
      </div>
      <div className="mt-3 md:me-5">
        {!currentUser ? (
          <>
            <div className="hidden md:flex">
              <Link
                to="/signin"
                className="font-bold text-md me-5 mt-2 cursor-pointer"
              >
                <LogIn className="w-[40px] inline" />
                SignIn
              </Link>
              <Link to="/signup">
                <Button btnText="SignUp Now" btnSize="md" />
              </Link>
            </div>
            <div>
              <Link to="/signin">
                <img
                  src={user}
                  alt="user-icon"
                  className="w-[30px] bg-red-600 fixed top-4 right-2 p-1 rounded-full block md:hidden"
                />
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-row relative">
            <Link to="/addtransactions">
              <SquarePlus
                color="#e3e4e8"
                className="w-[40px] fixed top-8 right-30 cursor-pointer md:block hidden"
              />
            </Link>
            <Button
              btnText="SignOut"
              btnSize="md"
              onClick={handleSignOut}
              hidebtn="sm"
            />
            <button onClick={toggleDrpdown} md:hidden="true">
              <img
                src={user}
                alt="user-icon"
                className="w-[30px] bg-red-600 fixed top-4 right-2 p-1 rounded-full block md:hidden"
              />
            </button>
            {isDropdownOpen && (
              <div className="flex flex-col justify-center absolute right-0 top-9">
                <Link to="/addtransactions">
                  <button className="bg-slate-100 px-2 py-1 text-green-600 font-medium w-[200px] border-1 border-slate-500 cursor-pointer hover:bg-slate-300">
                    Add Transactions
                  </button>
                </Link>
                <button
                  className="bg-slate-100 px-2 py-1 text-red-600 font-medium w-[200px] border-1 border-slate-500 cursor-pointer hover:bg-slate-300"
                  onClick={handleSignOut}
                >
                  SignOut
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Header;
