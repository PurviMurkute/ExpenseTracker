import React from "react";
import github from "./../assets/github.png";
import linkedin from "./../assets/linkedin.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-5 md:p-10 bottom-0 w-full">
      <p className="text-lg">&copy; 2025 Expense Diary. All rights reserved.</p>
      <Link to="https://peerlist.io/purvimurkute">
        <p className="text-md">Made with ❤️ by Purvi</p>
      </Link>
      <div className="flex flex-row justify-center items-center gap-3 mt-3">
        <Link to="https://github.com/PurviMurkute">
          <img src={github} alt="github-logo" className="w-[30px]" />
        </Link>
        <Link to="https://www.linkedin.com/in/purvi-murkute-72b914234/">
          <img src={linkedin} alt="linkedin-logo" className="w-[30px]" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
