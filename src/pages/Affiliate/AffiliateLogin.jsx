import React, { useEffect, useState } from "react";
import waves from "../../assets/waves.svg";
import affiliateBg from "../../assets/affiliateBg.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  enrollAffiliate,
  resetAffiliate,
} from "../../Redux/Features/affiliateEnrollSlice";
import { getUserDetails } from "../../Redux/Features/authSlice";

const AffiliateLogin = () => {
  const [username, setUsername] = useState("");
  const {
    affiliateEnrollLoading,
    affiliateEnrollError,
    affiliateEnrollSuccess,
    affiliateEnrollMessage,
  } = useSelector((state) => state.affiliate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      return;
    } else {
      dispatch(enrollAffiliate(username));
    }
  };

  useEffect(() => {
    if (affiliateEnrollSuccess) {
      dispatch(getUserDetails());
      navigate("/affiliate/dashboard");
      setTimeout(() => {
        dispatch(resetAffiliate());
      }, 4000);
    }
    if (affiliateEnrollError) {
      setTimeout(() => {
        dispatch(resetAffiliate());
      }, 4000);
    }
  }, [affiliateEnrollError, affiliateEnrollSuccess]);

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center lg:px-0 relative">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col items-start justify-center gap-5 px-5 lg:px-24"
      >
        <div className="flex flex-col items-start justify-start lg:gap-2 gap-4">
          <h1 className="text-black font-bold text-3xl">Become An Affiliate</h1>
          <p className="text-black/60">
            Partner with us by bringing people to our <br /> platform and earn a
            commission
          </p>
        </div>

        {affiliateEnrollMessage && (
          <p
            className={`${
              affiliateEnrollSuccess
                ? "text-white font-semibold bg-green-400 px-3 py-1 text-base"
                : "text-red-400 text-base"
            } text-center`}
          >
            {affiliateEnrollMessage}
          </p>
        )}

        <div className="w-full lg:gap-2 gap-4">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          // onClick={() => navigate("/affiliate/dashboard")}
          type="submit"
          className=" flex w-[50%] mx-auto justify-center mt-9 rounded-md border border-transparent bg-[#FF6700] py-3 px-4 text-sm font-medium text-white cursor-pointer focus:outline-none "
        >
          {affiliateEnrollLoading ? "Processing" : "Register"}
        </button>
      </form>

      <div className="w-full h-full">
        <img src={affiliateBg} className="h-full object-cover w-full" />
      </div>
    </div>
  );
};

export default AffiliateLogin;
