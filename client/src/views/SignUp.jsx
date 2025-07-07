import axios from "axios";
import { useState } from "react";
import Input from "../components/Input";
import logo from "./../assets/logo.png";
import toast, { Toaster } from "react-hot-toast";
import signup from "./../assets/signup.png";
import { Link } from 'react-router';
import Button from "../components/Button";
import Header from "../components/Header";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    DOB: "",
    city: "",
  });

  const signUp = async () => {
    try{
    const response = await axios.post(`${import.meta.env.VITE_API_KEY}/signup`, {
      name: user.name,
      email: user.email,
      password: user.password,
      DOB: user.DOB,
      city: user.city,
    });
    console.log(response.data.message);
    

    if (response.data.success) {
      toast.success(response.data.message);
      setUser({
        name: "",
        email: "",
        password: "",
        DOB: "",
        city: "",
      });
    } else {
      console.log(response.data);
      toast.error(response.data.message);
    }}catch(e){
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="bg-slate-600 min-h-screen top-0 left-0 fixed w-full block md:flex justify-center items-center">
      <Header/>
      <div className="md:w-[1050px] mt-18  px-5 md:px-10 md:py-2 md:my-20 flex justify-center items-center shadow-2xl rounded-md bg-white">
        <div className="md:pe-8">
          <img src={signup} alt="signupimg" className="hidden md:flex w-[430px]" />
        </div>
        <div>
          <h3 className="font-bold text-xl font-serif text-slate-600 py-1">
            <img src={logo} alt="logo" className="w-[40px] inline" />
            ExpenseDiary
          </h3>
          <h2 className="text-md text-slate-600 font-bold font-sans px-2 pe-1">
            🚀Get Started on a Smarter Spending Journey.
          </h2>
          <form
            className="w-[300px] md:w-[400px] block mx-auto bg-gradient-to-b from-blue-100 via-emerald-100 to-blue-200 py-1 md:py-3 px-2 shadow-xl my-2 rounded-md"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h2 className="font-bold text-slate-900 py-3 text-2xl text-center">
              SignUp
            </h2>
            <Input
              type="text"
              placeholder="FullName"
              value={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
            <Input
              type="text"
              placeholder="Email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
            <Input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
            <Input
              type="date"
              placeholder="Date of Birth"
              value={user.DOB}
              onChange={(e) => {
                setUser({ ...user, DOB: e.target.value });
              }}
            />
            <Input
              type="text"
              placeholder="City"
              value={user.city}
              onChange={(e) => {
                setUser({ ...user, city: e.target.value });
              }}
            />
            <Button btnText="SignUp" btnSize="sm" onClick={signUp}/>
          </form>
          <p className="text-slate-800 text-center font-medium py-2">Already have a ExpenseDiary account? <Link to='/signin' className="text-blue-700">SignIn</Link></p>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default SignUp;
