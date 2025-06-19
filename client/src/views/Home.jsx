import React from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import Button from "../components/Button";

const Home = () => {
  return (
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

      <div className="flex flex-col items-center justify-center inset-0 absolute text-white">
        <h3 className="text-5xl font-extrabold py-2">
          Goodbye Guesswork. Hello Financial Clarity!
        </h3>
        <h4 className="text-2xl font-bold py-2">
          See Where Your Money Goes — And Keep More of It.
        </h4>
        <p className="text-lg py-2">
          Turn everyday spending into meaningful savings. Get insights, set
          goals, and take control of your financial life with
          <span className="text-2xl font-bold"> ExpenseDiary!</span>
        </p>
        <Link to="/signup">
          <Button btnText="Start Now" btnSize="lg"/>
        </Link>
      </div>
    </div>
  );
};

export default Home;
