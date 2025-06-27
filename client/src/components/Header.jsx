import { Link, useLocation } from "react-router";
import logo from "./../assets/logo.png";
import { LogIn } from "lucide-react";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import user from './../assets/user.png'

const Header = () => {
  const [currentUser, setCurrentUser] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Overview");

  const location = useLocation();

  const fullWidthRoutes = ["/dashboard", "/transactions", "/addtransactions", "/reports", "/quickactions"];
  const isDashboard = fullWidthRoutes.some(path => location.pathname.startsWith(path));

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
    <div
      className={`fixed top-0 bg-slate-900 pb-2 md:py-2 w-full flex justify-between z-10 text-white ${
        isDashboard
          ? "w-full px-2 rounded-none"
          : "md:w-2/3  md:mx-60 my-1 px-4 md:px-7 rounded-full"
      }`}
    >
      <div>
        <Link to="/">
          <h1 className="font-bold text-xl md:text-3xl font-serif pt-2">
            <img
              src={logo}
              alt="logo"
              className="w-[35px] md:w-[40px] inline"
            />{" "}
            ExpenseDiary
          </h1>
        </Link>
      </div>
      <div className="mt-3 md:me-5">
        {!currentUser ? (
          <>
            <div className="hidden md:flex">
              <Link
                to="/signin"
                className="font-bold text-md me-5 mt-1 cursor-pointer"
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
              <User className="w-[35px] fixed top-4 right-5 md:right-[20%] rounded-full block md:hidden" />
              </Link>
            </div>
          </>
        ) : 
          <div className="flex relative">
            <button onClick={toggleDrpdown}>
              <User className={`${isDashboard? "right-2": "right-[20%"} w-[50px] fixed top-6 cursor-pointer block`}/>
            </button>
            {isDropdownOpen && (
              <div className="flex flex-col justify-center absolute right-0 top-9 bg-slate-100 px-3 py-2 rounded-xl">
                <Link to="/addtransactions">
                  <button className="p-1 text-slate-800 text-md w-[170px] font-medium cursor-pointer rounded-xl block mx-auto hover:bg-slate-300">
                    Add Transactions
                  </button>
                </Link>
                <button
                  className="p-1 text-slate-800 text-md w-[170px] font-medium cursor-pointer rounded-xl hover:bg-slate-300"
                  onClick={handleSignOut}
                >
                  SignOut
                </button>
              </div>
            )}
          </div> }
      </div>
      <div
        className={`${
          isDashboard
            ? "w-1/5 h-screen -z-10 bg-slate-900 fixed left-0 "
            : "hidden"
        }`}
      >
        <div className="flex flex-col mt-20 px-10">
          <Link
            to="/dashboard"
            className={`p-2 my-2 rounded-xl text-lg font-medium text-slate-100 hover:bg-slate-500 ${
              selectedTab == "Overview"
                ? "bg-slate-300 text-slate-900"
                : "bg-slate-900"
            }`}
            onClick={() => {
              setSelectedTab("Overview");
            }}
          >
            Overview
          </Link>
          <Link
            to="/transactions"
            className={`p-2 my-2 rounded-xl text-lg font-medium text-slate-100 hover:bg-slate-500 ${
              selectedTab == "Transactions"
                ? "bg-slate-300 text-slate-900"
                : "bg-slate-900"
            }`}
            onClick={() => {
              setSelectedTab("Transactions");
            }}
          >
            Transactions
          </Link>
          <Link
            to="/addtransactions"
            className={`p-2 my-2 rounded-xl text-lg font-medium text-slate-100 hover:bg-slate-500 ${
              selectedTab == "AddTransactions"
                ? "bg-slate-300 text-slate-900"
                : "bg-slate-900"
            }`}
            onClick={() => {
              setSelectedTab("AddTransactions");
            }}
          >
            Add Transactions
          </Link>
          <Link
            to="/reports"
            className={`p-2 my-2 rounded-xl text-lg font-medium text-slate-100 border-b-1 border-slate-200 hover:bg-slate-500 ${
              selectedTab == "Visualizations"
                ? "bg-slate-300 text-slate-900"
                : "bg-slate-900 pb-5"
            }`}
            onClick={() => {
              setSelectedTab("Visualizations");
            }}
          >
            Visualizations
          </Link>
          <Link
            className={`p-2 my-3 rounded-xl text-lg font-medium text-slate-100 hover:bg-slate-500 ${
              selectedTab == "QuickActions"
                ? "bg-slate-300 text-slate-900"
                : "bg-slate-900"
            }`}
            onClick={() => {
              setSelectedTab("QuickActions");
            }}
          >
            Quick Actions
          </Link>
          <Link
            to="signin"
            className={`p-2 my-2 rounded-xl text-lg font-medium text-slate-100 hover:bg-slate-500 fixed bottom-1`}
            onClick={handleSignOut}
          >
            Sign Out
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Header;
