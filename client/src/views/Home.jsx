import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";
import { FEATURESDATA, HEADING } from "../components/configFeatures.jsx";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import WorkflowCard from "../components/WorkflowCard.jsx";
import { motion } from "motion/react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const Home = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));

    if (currentUser) {
      setCurrentUser(currentUser);
    }
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="h-[600px] w-full bg-gradient-to-b from-blue-100 via-emerald-100 to-blue-200 relative">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #8c8c8c 1px, transparent 0px),
        linear-gradient(to bottom, #8c8c8c 1px, transparent 0px)
      `,
            backgroundSize: "35px 35px",
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
          className="flex flex-col items-center justify-center mx-8 mt-12 md:mt-0 inset-0 absolute text-slate-700 px-3 md:w-[800px] text-center block mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold py-3 md:py-2">
            Goodbye Guesswork. Hello Financial Clarity!
          </h3>
          <h4 className="text-xl md:text-2xl font-bold pb-3 md:py-2 bg-gradient-to-r from-cyan-700 via-blue-600 to-cyan-600 inline-block text-transparent bg-clip-text">
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
          <Link to={currentUser ? "/dashboard" : "/signup"}>
            <Button
              btnText="Start Now for Free"
              btnSize="lg"
              btnVariant="red"
            />
          </Link>
        </motion.div>
      </div>
      <div className="shadow-xl p-2 md:py-12 md:px-30 bg-gradient-to-b from-blue-100 via-emerald-100 to-blue-200">
        <h1 className="text-center text-2xl font-extrabold p-5 text-slate-800">
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
      <div className="shadow-xl px-10 md:px-30 py-5 md:py-20 bg-gradient-to-b from-blue-100 via-emerald-100 to-blue-200">
        <h1 className="text-center text-2xl font-extrabold py-6 text-slate-800">
          Workflow of ExpenseDiary
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center">
          <WorkflowCard
            step="1"
            bgColor="color1"
            title="Sign up and create your account"
            description="Sign up and create your account by providing basic details like
              name, email, password, etc. Once registered, you'll be able to log
              in and securely access your personal dashboard"
          />
          <WorkflowCard
            step="2"
            bgColor="color2"
            title="Add your income and expenses"
            description="Easily add your income and expenses by entering details like
              amount, category, and type. This helps you track where your money
              comes from and where it goes"
            reverse={true}
          />
          <WorkflowCard
            step="3"
            bgColor="color3"
            title="Track your spending in real-time!"
            description="Keep an eye on your money as you go. Understand your habits and
              make smarter choices to stay on track with your budget"
          />
        </div>
      </div>
      <div className="py-5 md:py-10 bg-gradient-to-b from-blue-100 via-emerald-100 to-blue-200">
        <h2 className="text-xl md:text-2xl font-extrabold text-center p-7 text-slate-800">
          No Fees. No Limits. Just Track.
        </h2>
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-[300px] md:w-[400px] flex flex-col justify-center items-center mx-auto bg-slate-500/50 rounded-xl shadow p-3 md:py-10 text-white"
        >
          <h3 className="text-2xl font-bold py-2">Free</h3>
          <p className="text-lg font-semibold text-gray-600 py-2">
            <span className="text-gray-800 text-4xl">₹0</span>/month
          </p>
          <ul className="flex flex-col justify-center gap-2 font-semibold">
            <li className="flex">
              <IoCheckmarkDoneOutline className="inline text-black text-2xl me-2" />{" "}
              Add unlimited transactions
            </li>
            <li className="flex">
              <IoCheckmarkDoneOutline className="inline text-black text-2xl me-2" />{" "}
              Visual dashboard with charts
            </li>
            <li className="flex">
              <IoCheckmarkDoneOutline className="inline text-black text-2xl me-2" />{" "}
              Filter by category
            </li>
            <li className="flex">
              <IoCheckmarkDoneOutline className="inline text-black text-2xl me-2" />{" "}
              Secure account with JWT authentication
            </li>
            <li className="flex">
              <IoCheckmarkDoneOutline className="inline text-black text-2xl me-2" />{" "}
              Edit & delete past transactions
            </li>
            <li className="flex">
              <IoCheckmarkDoneOutline className="inline text-black text-2xl me-2" />{" "}
              Responsive design for all devices
            </li>
            <li className="flex">
              <IoCheckmarkDoneOutline className="inline text-black text-2xl me-2" />{" "}
              Password change & account deletion
            </li>
          </ul>
          <Button
            btnText="Get Started"
            btnSize="lg"
            btnVariant="green"
            onClick={() =>
              setTimeout(() => {
                navigate("/dashboard");
              }, 1000)
            }
          />
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
