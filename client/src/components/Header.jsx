import { Link, useLocation, useNavigate } from "react-router";
import logo from "./../assets/logo.png";
import { LogIn } from "lucide-react";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import {
  LayoutDashboard,
  BadgeIndianRupee,
  ChartArea,
  BadgePlus,
  LogOut,
  AlignJustify,
} from "lucide-react";

const Header = () => {
  const [currentUser, setCurrentUser] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Overview");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fullWidthRoutes = [
    "/dashboard",
    "/transactions",
    "/addtransactions",
    "/reports",
    "/quickactions"
  ];
  const isDashboard = fullWidthRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  const toggleDrpdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
      navigate("/signin");
    }, 3000);
  };

  return (
    <div
      className={`fixed top-0 pb-2 md:py-1 w-full flex justify-between z-10 text-white ${
        isDashboard
          ? "w-full px-2 bg-[#303d50] rounded-none"
          : "md:w-2/3 bg-slate-900 md:mx-62 my-1 px-4 md:px-7 rounded-full"
      }`}
    >
      <div className="flex flex-row">
        {isDashboard ? (
          <AlignJustify
            className="inline w-[30px] mt-3.5 pe-2 cursor-pointer md:hidden"
            onClick={toggleNav}
          />
        ) : null}

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
                <Button btnText="SignUp Now" btnSize="md" btnVariant="red"/>
              </Link>
            </div>
            <div>
              <Link to="/signin">
                <User className="w-[35px] fixed top-4 right-5 md:right-[20%] rounded-full block md:hidden" />
              </Link>
            </div>
          </>
        ) : (
          <div className="flex relative">
            <button onClick={toggleDrpdown}>
              <User
                className={`${
                  isDashboard ? "right-2" : "right-2 md:right-[18%]"
                } w-[40px] md:w-[55px] h-[30px] md:h-[35px] fixed md:top-5 cursor-pointer block`}
              />
            </button>
            {isDropdownOpen && (
              <div className="flex flex-col justify-center absolute right-0 top-9 bg-slate-100 px-3 py-1 rounded-xl w-[140px]">
                <Link to="/dashboard">
                  <button className="p-1 text-slate-800 text-md font-medium cursor-pointer px-2 rounded-xl block mx-auto hover:bg-slate-300">
                    Dashboard
                  </button>
                </Link>
                <Link>
                  <button className="pb-1 text-slate-800 text-md font-medium cursor-pointer px-5 rounded-xl block mx-auto hover:bg-slate-300">
                    Profile
                  </button>
                </Link>
                <button
                  className=" text-red-500 text-md font-medium cursor-pointer rounded-xl hover:bg-slate-300"
                  onClick={handleSignOut}
                >
                  SignOut
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={`${
          isDashboard
            ? `w-full md:w-1/6 ${
                isNavOpen ? "block" : "hidden"
              } md:block h-screen -z-10 bg-[#303d50] fixed left-0 `
            : "hidden"
        }`}
      >
        <div className="flex flex-col mt-20 px-5">
          <Link
            to="/dashboard"
            className={`p-2 my-2 rounded-xl text-lg font-medium text-slate-100 hover:bg-slate-500 ${
              selectedTab == "Overview"
                ? "bg-slate-300 text-slate-900"
                : "bg-[#303d50]"
            }`}
            onClick={() => {
              setSelectedTab("Overview");
              toggleNav();
            }}
          >
            <LayoutDashboard className="inline w-[23px]" /> Overview
          </Link>
          <Link
            to="/transactions"
            className={`p-2 my-2 rounded-xl text-lg font-medium text-slate-100 hover:bg-slate-500 ${
              selectedTab == "Transactions"
                ? "bg-slate-300 text-slate-900"
                : "bg-[#303d50]"
            }`}
            onClick={() => {
              setSelectedTab("Transactions");
              toggleNav();
            }}
          >
            <BadgeIndianRupee className="inline w-[23px]" /> Transactions
          </Link>
          <Link
            to="/addtransactions"
            className={`p-2 my-2 rounded-xl text-lg font-medium text-slate-100 hover:bg-slate-500 ${
              selectedTab == "AddTransactions"
                ? "bg-slate-300 text-slate-900"
                : "bg-[#303d50]"
            }`}
            onClick={() => {
              setSelectedTab("AddTransactions");
              toggleNav();
            }}
          >
            <BadgePlus className="inline w-[23px]" /> Add Transactions
          </Link>
          <Link
            to="/reports"
            className={`p-2 my-2 rounded-xl text-lg font-medium text-slate-100 border-b-1 border-slate-200 hover:bg-slate-500 ${
              selectedTab == "Visualizations"
                ? "bg-slate-300 text-slate-900"
                : "bg-[#303d50] pb-5"
            }`}
            onClick={() => {
              setSelectedTab("Visualizations");
              toggleNav();
            }}
          >
            <ChartArea className="inline w-[23px]" /> Visualizations
          </Link>
        
          <Link
            className={`p-2 my-3 rounded-xl text-lg font-medium text-slate-100 hover:bg-slate-500 ${
              selectedTab == "QuickActions"
                ? "bg-slate-300 text-slate-900"
                : "bg-[#303d50]"
            }`}
            onClick={() => {
              setSelectedTab("QuickActions");
              toggleNav();
            }}
          >
            Quick Actions
          </Link>
          <Link
            to="signin"
            className={`w-[220px] p-2 my-2 rounded-xl text-lg font-medium border-t-1 border-slate-200 text-slate-100 hover:bg-slate-500 fixed bottom-1`}
            onClick={handleSignOut}
          >
            <LogOut className="inline w-[23px]" /> Sign Out
          </Link>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Header;
