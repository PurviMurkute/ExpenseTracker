import axios from "axios";
import { useState } from "react";
import Input from "../components/Input";
import logo from "./../assets/logo.png";
import signupimg from './../assets/signupimg.png';

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    DOB: "",
    city: "",
  });

  const signUp = async () => {
    const response = await axios.post(`http://localhost:5001/signup/`, {
      name: user.name,
      email: user.email,
      password: user.password,
      DOB: user.DOB,
      city: user.city,
    });
    console.log(response.data.data);
  };
  return (
    <div className="bg-slate-100 min-h-screen top-0 left-0 fixed w-full flex justify-center items-center">
      <div className="h-[25px] bg-slate-900 w-full fixed top-0"></div>
    <div className="w-[1000px] border-1 border-slate-400 rounded-2xl py-5 px-10 flex justify-center items-center shadow-xl">
      <div className="p-5">
        <img src={signupimg} alt="signup-icon" className="w-[500px]"/>
      </div>
      <div>
        <h3 className="font-bold text-xl font-serif text-slate-600 py-2">
          <img src={logo} alt="logo" className="w-[40px] inline" /> ExpenseDiary
        </h3>
        <h2 className="text-lg text-slate-700 font-bold pe-3">🚀Get Started on a Smarter Spending Journey.</h2>
        <form className="w-[420px] block mx-auto bg-slate-400 py-5 px-2 shadow-xl my-2" onSubmit={(e)=>{e.preventDefault()}}>
            <h2 className="font-bold text-slate-900 py-3 text-2xl text-center">SignUp</h2>
          <Input
            type="text"
            placeholder="FullName"
            value={user.name}
            onChange={(e) => {
              setUser({...user, name: e.target.value})
            }}
          />
          <Input
            type="text"
            placeholder="Email"
            value={user.email}
            onChange={(e) => {
              setUser({...user, email: e.target.value})
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => {
              setUser({...user, password: e.target.value})
            }}
          />
          <Input
            type="text"
            placeholder="Date of Birth"
            value={user.DOB}
            onChange={(e) => {
              setUser({...user, DOB: e.target.value})
            }}
          />
          <Input
            type="text"
            placeholder="City"
            value={user.city}
            onChange={(e) => {
              setUser({...user, city: e.target.value})
            }}
          />
          <button className="text-lg font-bold bg-red-700 text-slate-100 block mx-auto my-5 px-4 py-1 cursor-pointer" onClick={signUp}>SignUp</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
