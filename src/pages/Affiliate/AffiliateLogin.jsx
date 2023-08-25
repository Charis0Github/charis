import React from "react";
import waves from "../../assets/waves.svg";
import affiliateBg from "../../assets/affiliateBg.png";
import { Link, useNavigate } from "react-router-dom";

const AffiliateLogin = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center lg:px-0 relative">
      <div className="w-full h-full flex flex-col items-start justify-center gap-5 px-5 lg:px-24">
        <div className="flex flex-col items-start justify-start lg:gap-2 gap-4">
          <h1 className="text-black font-bold text-3xl">Become An Affiliate</h1>
          <p className="text-black/60">
            Partner with us by bringing people to our <br /> platform and earn a
            commission
          </p>
        </div>

        <div className="w-full lg:gap-2 gap-4">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
            placeholder="Type your Username of Choice"
          />
        </div>

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <button
          onClick={() => navigate("/affiliate/dashboard")}
          type="submit"
          className=" flex w-[50%] mx-auto justify-center mt-9 rounded-md border border-transparent bg-[#FF6700] py-3 px-4 text-sm font-medium text-white  focus:outline-none "
        >
          Sign In
        </button>
      </div>

      <div className="w-full h-full">
        <img src={affiliateBg} className="h-full object-cover w-full" />
      </div>
    </div>
  );
};

export default AffiliateLogin;
