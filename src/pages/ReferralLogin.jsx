import React, { useEffect, useState } from "react";
import login1 from "../assets/login1.png";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createUser,
  loginUser,
  reset,
  getUserDetails,
} from "../Redux/Features/authSlice";

const ReferralLogin = () => {
  const pageState = localStorage.getItem("pageState");
  const [register, setRegister] = useState(pageState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const {
    isLoading,
    isError,
    isSuccess,
    message,
    isSignInSuccess,
    isSignInError,
  } = useSelector((state) => state.auth);

  const [registerForm, setRegisterForm] = useState({
    referralCode: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm({ ...registerForm, [name]: value });
    // console.log(registerForm)
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleRegister = (data) => {
    if (data === "login") {
      setRegister("false");
      localStorage.setItem("pageState", "false");
    } else {
      setRegister("true");
      localStorage.setItem("pageState", "true");
    }
    // console.log("PAGE STATE:" + register);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerForm.password === registerForm.passwordConfirm) {
      const formData = {
        referralCode: registerForm.referralCode,
        name: registerForm.name,
        email: registerForm.email,
        phoneNumber: registerForm.phone,
        password: registerForm.password,
      };
      dispatch(createUser(formData));
    } else {
      setInfo("passwords do no match");
      setTimeout(() => {
        setInfo("");
      }, 3000);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: loginForm.email,
      password: loginForm.password,
    };
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      setRegister(!register);
      setTimeout(() => {
        dispatch(reset());
      }, 4000);
    }

    if (isError) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }

    if (isSignInError) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }

    if (isSignInSuccess) {
      dispatch(getUserDetails());
      navigate("/");
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }
  }, [isSuccess, isError, message, isSignInSuccess, isSignInError]);

  useEffect(() => {
    // console.log(pageState);
    // console.log("register" + register);
    if (pageState === null) {
      setRegister("false");
    } else {
      return;
    }
  }, []);
  useEffect(() => {
    if (params.referralCode) {
      console.log("REFERRALCODE: " + params.referralCode);
      setRegisterForm({ ...registerForm, referralCode: params.referralCode });
      console.log(registerForm.referralCode);
    }
  }, [params]);

  return (
    <div className="w-full h-screen lg:flex items-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {register === "true" ? (
          <React.Fragment>
            {/* RESISTRATION FORM BEGINS HERE  */}
            <form
              onSubmit={handleRegisterSubmit}
              className="w-full lg:px-24 p-6 py-6"
            >
              <h1 className="text-black text-[20px] font-sans font-bold mb-[15px]">
                Welcome
              </h1>

              <p className="font-normal font-sans mb-[20px] text-[#11111195]">
                Let's get you signed up
              </p>

              {message && (
                <p
                  className={`${
                    isSuccess
                      ? "text-white font-semibold bg-green-400 px-3 py-1 text-base"
                      : "text-red-400 text-base"
                  } text-center`}
                >
                  {message}
                </p>
              )}

              <div>
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onChange={handleRegisterChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your Full Name"
                />
              </div>

              <div>
                <label htmlFor="email-address" className="text-sm">
                  E-mail
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  onChange={handleRegisterChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your e-mail"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  required
                  onChange={handleRegisterChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your Phone Number"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleRegisterChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your Password"
                />
              </div>

              <div>
                <label htmlFor="passwordConfirm" className="text-sm">
                  Confirm Password
                </label>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  required
                  onChange={handleRegisterChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your Password"
                />
              </div>

              <button
                type="submit"
                className=" flex w-[80%] mx-auto justify-center mt-9 rounded-md border border-transparent bg-[#FF6700] py-3 px-4 text-sm font-medium text-white  focus:outline-none "
              >
                {isLoading ? "Processing" : "Sign Up"}
              </button>
            </form>
            {/* REGISTRATION FORM ENDS HERE */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* LOGIN FORM BEGINS HERE */}
            <form
              onSubmit={handleLoginSubmit}
              className="w-full lg:px-24 p-6 py-6"
            >
              <h1 className="text-black text-[20px] font-sans font-bold mb-[15px]">
                Welcome
              </h1>

              <p className="font-normal font-sans mb-[20px] text-[#11111195]">
                Let's get you logged in
              </p>

              {message && (
                <p
                  className={`${
                    isSuccess
                      ? "text-white font-semibold bg-green-400 px-3 py-1 text-base"
                      : "text-red-400 text-base"
                  } text-center`}
                >
                  {message}
                </p>
              )}

              <div>
                <label htmlFor="email-address" className="text-sm">
                  E-mail
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={handleLoginChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your e-mail"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleLoginChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your Password"
                />
              </div>

              <div className="flex items-center justify-between">
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

                <div className="text-sm">
                  <a href="#" className="font-medium text-[#FF6700]">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className=" flex w-[80%] mx-auto justify-center mt-9 rounded-md border border-transparent bg-[#FF6700] py-3 px-4 text-sm font-medium text-white  focus:outline-none "
              >
                {isLoading ? "Processing" : "Sign In"}
              </button>
            </form>
            {/* LOGIN FORM ENDS HERE */}
          </React.Fragment>
        )}

        {register === "true" ? (
          <p>
            Already Have an Account?
            <span
              onClick={() => handleRegister("login")}
              className="text-[#0106A0] cursor-pointer"
            >
              Sign In
            </span>
          </p>
        ) : (
          <p>
            Don't Have an Account?
            <span
              onClick={() => handleRegister("register")}
              className="text-[#0106A0] cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
      <div className="w-full h-full login flex items-center justify-center relative">
        <div className="absolute w-full h-full bg-[#ffffff5a]"></div>
        <img className="z-10" src={login1} />
      </div>
    </div>
  );
};
export default ReferralLogin;
