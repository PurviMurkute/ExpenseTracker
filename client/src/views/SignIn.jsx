import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import signinimg from './../assets/signinimg.png';

const SignIn = () => {
  const [signInUser, setSignInUser] = useState({
    email: "",
    password: "",
  });

  const signIn = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/login`,
      {
        email: signInUser.email,
        password: signInUser.password,
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);

      localStorage.setItem("currentuser", JSON.stringify(response.data.data));

      setSignInUser({
        email: "",
        password: "",
      });

      toast.loading("redirecting to dashboard");

      setTimeout(() => {
        window.location.href = "/dasboard";
      }, 3000);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 top-0 left-0 fixed w-full flex justify-center items-center">
      <div className="h-[25px] bg-slate-900 w-full fixed top-0"></div>
      <div className="flex justify-center items-center w-[1000px] bg-white">
      <div className="">
      <form
        className="w-[420px] block mx-auto bg-slate-400 py-5 px-2 shadow-xl my-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2 className="font-bold text-slate-900 py-3 text-2xl text-center">
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
          type="password"
          placeholder="Password"
          value={signInUser.password}
          onChange={(e) => {
            setSignInUser({ ...signInUser, password: e.target.value });
          }}
        />
        <button
          className="text-lg font-bold bg-red-700 text-slate-100 block mx-auto my-5 px-4 py-1 cursor-pointer"
          onClick={signIn}
        >
          SignIn
        </button>
      </form>
      </div>
      <div className="">
        <img src={signinimg} alt="login-img" className="w-[400px]"/>
      </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default SignIn;
