import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import Button from "../components/Button";
import { FEATURESDATA, HEADING } from "../configFeatures.jsx";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import signupimg from "./../assets/signup-img.png";
import transactionimg from "./../assets/transaction-img.png";
import reportimg from "./../assets/reports-img.png";
import WorkflowCard from "../components/WorkflowCard.jsx";
import { motion } from "motion/react";

const Home = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));

    if (currentUser) {
      setCurrentUser(currentUser);
    }
  }, []);

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center justify-center mx-4 inset-0 absolute bg-gradient-to-r from-orange-200 via-blue-200 to-cyan-200 text-transparent bg-clip-text"
        >
          <h3 className="text-4xl md:text-5xl font-extrabold py-4 md:py-2">
            Goodbye Guesswork. Hello Financial Clarity!
          </h3>
          <h4 className="text-xl md:text-2xl font-bold pb-4 md:py-2">
            See Where Your Money Goes And Keep More of It.
          </h4>
          <p className="text-lg pb-4 md:py-2">
            Turn everyday spending into meaningful savings. Get insights, set
            goals, and take control of your financial life with
            <span className="text-xl md:text-2xl font-bold">
              {" "}
              ExpenseDiary!
            </span>
          </p>
          {!currentUser ? (
            <Link to="/signup">
              <Button btnText="Start Now" btnSize="lg" />
            </Link>
          ) : (
            <Link to="/dashboard">
              <Button btnText="Start Now" btnSize="lg" />
            </Link>
          )}
        </motion.div>
      </div>
      <div className="shadow-xl p-2 md:p-20 bg-gradient-to-l from-slate-200 to-slate-100">
        <h1 className="text-center text-2xl font-extrabold py-6 text-slate-800">
          {HEADING}
        </h1>
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-evenly flex-wrap"
        >
          {FEATURESDATA.map((feature, i) => {
            const { icon, title, description, className } = feature;

            return (
              <FeatureCard
                icon={icon}
                title={title}
                description={description}
                key={i}
                className={className}
              />
            );
          })}
        </motion.div>
      </div>
      <div className="shadow-xl px-4 md:px-50 py-5 md:py-10 bg-slate-800">
        <h1 className="text-center text-2xl font-extrabold py-6 text-slate-100">
          Workflow of ExpenseDiary
        </h1>
        <WorkflowCard
          img={signupimg}
          step="1"
          bgColor="color1"
          title="Sign up and create your account"
          description="Sign up and create your account by providing basic details like
              name, email, password, etc. Once registered, you'll be able to log
              in and securely access your personal dashboard"
        />
        <WorkflowCard
          img={transactionimg}
          step="2"
          bgColor="color2"
          title="Add your income and expenses"
          description="Easily add your income and expenses by entering details like
              amount, category, and type. This helps you track where your money
              comes from and where it goes"
          reverse={true}
        />
        <WorkflowCard
          img={reportimg}
          step="3"
          bgColor="color3"
          title="Track your spending with real-time charts, Get insights and stay
              on budget!"
          description="Keep an eye on your money as you go. Understand your habits and
              make smarter choices to stay on track with your budget"
        />
      </div>
      <Footer />
    </>
  );
};

export default Home;
