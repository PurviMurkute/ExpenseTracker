import { Link, useLocation, useNavigate } from "react-router";
import logo from "./../assets/logo.png";
import { LogIn } from "lucide-react";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaCrosshairs } from "react-icons/fa";
import {
  LayoutDashboard,
  BadgeIndianRupee,
  ChartArea,
  BadgePlus,
  LogOut,
  AlignJustify,
} from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";

const Header = () => {
  const [currentUser, setCurrentUser] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fullWidthRoutes = [
    "/dashboard",
    "/transactions",
    "/addtransactions",
    "/reports",
    "/quickactions",
    "/profile",
    "/ai"
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

  const path = location.pathname;

  const getMenuTab = (menuTab) =>
    `p-2 my-2 rounded-xl text-[17px] font-medium text-slate-100 hover:bg-slate-500 ${
      path === menuTab ? "bg-gray-400/70 text-slate-900" : "bg-[#303d50]"
    }`;

  return (
    <div
      className={`fixed top-0 pb-2 md:py-1 w-full flex justify-between z-10 text-white ${
        isDashboard
          ? "w-full px-2 bg-[#303d50] rounded-none"
          : "md:w-2/3 bg-slate-900 md:mx-62 my-1 px-4 md:px-7 rounded-full"
      }`}
    >
      <div className="flex justify-between items-center px-3 w-full">
        <div className="flex justify-start gap-2 items-center">
          {isDashboard && (
            <AlignJustify
              className="inline w-[30px] mt-3.5 pe-2 cursor-pointer md:hidden"
              onClick={toggleNav}
            />
          )}
          <Link to="/">
            <h1 className="font-bold text-xl md:text-2xl font-serif py-1 flex items-center gap-2">
              <img
                src={logo}
                alt="logo"
                className="w-[30px] md:w-[35px] inline"
              />
              <span>ExpenseDiary</span>
            </h1>
          </Link>
          
        </div>
        <div>
            {!currentUser ? (
              <>
                <div className="hidden md:flex items-center">
                  <Link
                    to="/signin"
                    className="font-bold text-md me-5 mt-1 cursor-pointer"
                  >
                    <LogIn className="w-[40px] inline" />
                    SignIn
                  </Link>
                  <Link to="/signup">
                    <Button
                      btnText="SignUp Now"
                      btnSize="md"
                      btnVariant="red"
                    />
                  </Link>
                </div>
                <div>
                  <Link to="/signin">
                    <FaUserCircle className="text-2xl fixed top-4.5 right-5 md:right-[20%] block md:hidden" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center relative">
                <button onClick={toggleDrpdown}>
                  <FaUserCircle
                    className={`${
                      isDashboard ? "right-2" : "right-2 md:right-[18%]"
                    } text-2xl md:w-[55px] h-[30px] md:h-[35px] fixed md:top-2 cursor-pointer block`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="flex flex-col justify-center absolute right-0 top-9 bg-slate-100 px-3 py-1 rounded-xl w-[150px]">
                    <Link to="/dashboard">
                      <button className="p-1 text-slate-800 text-md font-medium cursor-pointer px-2 py-1 w-full rounded-xl flex items-center hover:bg-slate-300">
                        <MdDashboard className="text-xl me-2" />
                        <p>Dashboard</p>
                      </button>
                    </Link>
                    <Link to="/profile">
                      <button className="pb-1 text-slate-800 text-md font-medium cursor-pointer w-full px-2 py-1 rounded-xl flex items-center hover:bg-slate-300">
                        <RiUserFill className="text-xl me-2" />
                        <p>Profile</p>
                      </button>
                    </Link>
                    <hr className="text-black my-1" />
                    <button
                      className=" text-red-500 text-md font-medium cursor-pointer px-2 py-1 rounded-xl flex items-center hover:bg-slate-300"
                      onClick={handleSignOut}
                    >
                      <IoLogOut className="text-xl me-2" />
                      <p>SignOut</p>
                    </button>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>

      <div
        className={`${
          isDashboard
            ? `w-[85%] md:w-[60%] lg:w-1/6 ${
                isNavOpen ? "block" : "hidden"
              } lg:block h-screen -z-10 bg-[#303d50] fixed left-0 `
            : "hidden"
        }`}
      >
        <div className="flex flex-col mt-20 px-5">
          <Link
            to="/dashboard"
            className={getMenuTab("/dashboard")}
            onClick={() => {
              toggleNav();
            }}
          >
            <LayoutDashboard className="inline w-[23px]" /> Overview
          </Link>
          <Link
            to="/transactions"
            className={getMenuTab("/transactions")}
            onClick={() => {
              toggleNav();
            }}
          >
            <BadgeIndianRupee className="inline w-[23px]" /> Transactions
          </Link>
          <Link
            to="/addtransactions"
            className={getMenuTab("/addtransactions")}
            onClick={() => {
              toggleNav();
            }}
          >
            <BadgePlus className="inline w-[23px]" /> Add Transactions
          </Link>
          <Link
            to="/reports"
            className={getMenuTab("/reports")}
            onClick={() => {
              toggleNav();
            }}
          >
            <ChartArea className="inline w-[23px]" /> Visualizations
          </Link>
          {/* <Link to={'/ai'} className={getMenuTab("/ai")} onClick={()=>toggleNav()}>
          <FaCrosshairs className="inline w-[23px]" /> AI
          </Link> */}
          <hr className="my-5 text-gray-400 h-[0.5px]" />
          <Link
            to="signin"
            className={`w-[70%] md:w-[210px] px-4 py-2 my-2 rounded-xl text-lg font-medium border-t-1 border-gray-400 text-slate-100 hover:bg-slate-500 fixed bottom-1`}
            onClick={handleSignOut}
          >
            <LogOut className="inline w-[23px] me-3" /> Sign Out
          </Link>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Header;
