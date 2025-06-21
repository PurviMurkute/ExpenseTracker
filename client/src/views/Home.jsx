import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import Button from "../components/Button";
import { FEATURESDATA, HEADING } from "../configFeatures.jsx";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

const Home = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(()=>{
    const currentUser = JSON.parse(localStorage.getItem("currentuser"))

    if(currentUser){
      setCurrentUser(currentUser);
    }
  }, [])

  return (
    <>
    <div className="min-h-screen w-full bg-slate-800 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
        }}
      />

      <Header />

      <div className="flex flex-col items-center justify-center mx-4 inset-0 absolute text-white">
        <h3 className="text-4xl md:text-5xl font-extrabold py-4 md:py-2">
          Goodbye Guesswork. Hello Financial Clarity!
        </h3>
        <h4 className="text-xl md:text-2xl font-bold pb-4 md:py-2">
          See Where Your Money Goes And Keep More of It.
        </h4>
        <p className="text-lg pb-4 md:py-2">
          Turn everyday spending into meaningful savings. Get insights, set
          goals, and take control of your financial life with
          <span className="text-xl md:text-2xl font-bold"> ExpenseDiary!</span>
        </p>
        {!currentUser ? <Link to="/signup">
          <Button btnText="Start Now" btnSize="lg"/>
        </Link> : <Link to="/dashboard">
          <Button btnText="Start Now" btnSize="lg"/>
        </Link>}
        
      </div>
    </div>
    <div className='shadow-xl rounded-xl p-2 md:p-20 bg-slate-200'>
      <h1 className="text-center text-2xl font-extrabold py-6 text-slate-800">{HEADING}</h1>
    <div className='flex justify-evenly flex-wrap'>
    {
      FEATURESDATA.map((feature, i)=>{
        const {icon, title, description, className} = feature;

        return( <FeatureCard icon={icon} title={title} description={description} key={i} className={className} />)
      })
    }
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
