import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import logo from "./../assets/logo.png";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import signinimg from "./../assets/signinimg.png";
import Button from "../components/Button";
import Header from "../components/Header";
import { FaSignInAlt } from "react-icons/fa";

const SignIn = () => {
  const [signInUser, setSignInUser] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/auth/login`,
        {
          email: signInUser.email,
          password: signInUser.password,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("currentuser", JSON.stringify(response.data.data));

        localStorage.setItem(
          "JwtToken",
          JSON.stringify(response.data.jwtToken)
        );

        setSignInUser({
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-600 top-0 left-0 fixed w-full flex justify-center items-center">
      <Header />
      <div className="flex justify-center items-center md:w-[950px] bg-white rounded-md py-4 px-3 md:py-10">
        <div className="ms-1 md:me-5">
          <div className="w-[300px] md:w-[420px] my-2">
            <h3 className="font-bold text-xl font-serif text-slate-600 py-2">
              <img src={logo} alt="logo" className="w-[40px] inline" />
              ExpenseDiary
            </h3>
            <h2 className="text-md text-slate-600 font-bold font-sans px-2 pe-1">
              Welcome Back! Sign In to Keep Tracking, Saving, and Thriving.
            </h2>
          </div>
          <form
            className="w-[300px] md:w-[420px] block mx-auto bg-gradient-to-b from-blue-100 via-emerald-100 to-blue-200 py-5 px-2 shadow-xl my-2 rounded-md relative"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FaSignInAlt className="text-xl block mx-auto text-blue-700" />
            <h2 className="font-bold text-slate-900 pt-1 pb-3 text-2xl text-center">
              SignIn
            </h2>
            <Input
              type="text"
              placeholder="Email"
              value={signInUser.email}
              onChange={(e) => {
                setSignInUser({ ...signInUser, email: e.target.value });
              }}
            />
            <Input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={signInUser.password}
              onChange={(e) => {
                setSignInUser({ ...signInUser, password: e.target.value });
              }}
              passwordInput="true"
              showPass={showPass}
              setShowPass={setShowPass}
            />
            <Button
              btnText="SignIn"
              btnSize="auth_btn"
              onClick={signIn}
              btnVariant="blue"
            />
            <Button
              btnText="Login with Google"
              btnSize="auth_btn"
              iconPosition="left"
              icon="google"
              onClick={() => {window.open(`${import.meta.env.VITE_API_KEY}/auth/google`, "_self")}}
              btnVariant="outline"
            />
          </form>
          <p className="text-slate-800 text-center font-medium py-2">
            Dont have an account?{" "}
            <Link to="/signup" className="text-blue-700">
              SignUp now.
            </Link>
          </p>
        </div>
        <div className="">
          <img
            src={signinimg}
            alt="login-img"
            className="hidden md:flex w-[400px]"
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SignIn;
