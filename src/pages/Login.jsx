import React, { useEffect, useState } from "react";
import login1 from "../assets/login1.png";
import welcom from "../assets/welcom.jpeg";
import eye from "../assets/eye-open.svg";
import closeEye from "../assets/eye-close.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createUser,
  loginUser,
  reset,
  getUserDetails,
  forgotPassword,
} from "../Redux/Features/authSlice";
import { resetPayment } from "../Redux/Features/paymentSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const pageState = localStorage.getItem("pageState");
  const [PageState, setPageState] = useState(pageState || "login");
  const [info, setInfo] = useState("");
  const [passwordView, setPasswordView] = useState({
    pass: false,
    confirmP: false,
  });

  const [loginPass, setLoginPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    isSuccess,
    message,
    isSignInSuccess,
    isSignInError,
  } = useSelector((state) => state.auth);

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    referralCode: "",
    password: "",
    passwordConfirm: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
  });

  const handlePassView = (view) => {
    if (view === "pass") {
      if (passwordView.pass === true) {
        setPasswordView({ pass: false });
      } else {
        setPasswordView({ pass: true });
      }
    } else if (view === "other") {
      if (passwordView.confirmP === true) {
        setPasswordView({ confirmP: false });
      } else {
        setPasswordView({ confirmP: true });
      }
    } else {
      console.log("error with eye Icon");
    }
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm({ ...registerForm, [name]: value });
    // console.log(registerForm)
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };
  const handleForgotPasswordChange = (event) => {
    const { name, value } = event.target;
    setForgotPasswordForm({ ...loginForm, [name]: value });
  };

  const handleRegister = (data) => {
    if (data === "login") {
      setPageState("login");
      localStorage.setItem("pageState", "login");
    } else {
      if (data === "password") {
        setPageState("password");
        localStorage.setItem("pageState", "password");
      } else {
        setPageState("register");
        localStorage.setItem("pageState", "register");
      }
    }
    // console.log("PAGE STATE:" + register);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerForm.password === registerForm.passwordConfirm) {
      const formData = {
        name: registerForm.name,
        email: registerForm.email,
        phoneNumber: registerForm.phone,
        referralCode: registerForm.referralCode,
        password: registerForm.password,
      };
      dispatch(createUser(formData));
    } else {
      toast.error("passwords do no match");
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
  const handleforgotPasswordSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: forgotPasswordForm.email,
    };
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      setTimeout(() => {
        dispatch(reset());
      }, 4000);
    }

    if (isError) {
      toast.error(message);

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

  return (
    <div className="w-full lg:flex login items-center pt-6 pb-12">
      <div className="w-full h-full flex flex-col items-center justify-center max-w-2xl m-auto rounded-lg bg-[#ffffffc9]  pt-6 pb-6">
        <img className="w-3/12" src={login1} />
        {PageState === "register" && (
          <React.Fragment>
            {/* RESISTRATION FORM BEGINS HERE  */}
            <form
              onSubmit={handleRegisterSubmit}
              className="w-full h-max lg:px-24 p-6 py-6"
            >
              <h1 className="text-black text-[35px] font-sans font-bold mb-[15px]">
                Welcome
              </h1>

              <p className="font-normal font-sans mb-[20px] text-[#11111195]">
                Let's get you signed up
              </p>
              {/* 
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
              )} */}
              {info && (
                <p
                  className={`${
                    isSuccess
                      ? "text-white font-semibold bg-green-400 px-3 py-1 text-base"
                      : "text-red-400 text-base"
                  } text-center`}
                >
                  {info}
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
                <label htmlFor="referral" className="text-sm">
                  Referral Code
                </label>
                <input
                  id="referral"
                  name="referralCode"
                  type="text"
                  required
                  onChange={handleRegisterChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your Referral Code"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type={passwordView.pass === true ? "text" : "password"}
                  required
                  onChange={handleRegisterChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your Password"
                />
                {passwordView.pass === true ? (
                  <img
                    onClick={() => handlePassView("pass")}
                    className="absolute right-3 top-9 cursor-pointer"
                    width={20}
                    height={20}
                    src={closeEye}
                    alt="user icon"
                  />
                ) : (
                  <img
                    onClick={() => handlePassView("pass")}
                    className="absolute right-3 top-9 cursor-pointer"
                    width={20}
                    height={20}
                    src={eye}
                    alt="user icon"
                  />
                )}
              </div>

              <div className="relative">
                <label htmlFor="passwordConfirm" className="text-sm">
                  Confirm Password
                </label>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={passwordView.confirmP === true ? "text" : "password"}
                  required
                  onChange={handleRegisterChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your Password"
                />

                {passwordView.confirmP === true ? (
                  <img
                    onClick={() => handlePassView("other")}
                    className="absolute right-3 top-9 cursor-pointer"
                    width={20}
                    height={20}
                    src={closeEye}
                    alt="user icon"
                  />
                ) : (
                  <img
                    onClick={() => handlePassView("other")}
                    className="absolute right-3 top-9 cursor-pointer"
                    width={20}
                    height={20}
                    src={eye}
                    alt="user icon"
                  />
                )}
              </div>

              <button
                type="submit"
                className=" flex w-[80%] mx-auto justify-center mt-9 rounded-md border border-transparent bg-[#FF6700] py-3 px-4 text-sm font-medium text-white  focus:outline-none "
              >
                {isLoading && (
                  <svg
                    aria-hidden="true"
                    class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
                {!isLoading && "Sign Up"}
              </button>
            </form>
            {/* REGISTRATION FORM ENDS HERE */}
          </React.Fragment>
        )}
        {PageState === "login" && (
          <React.Fragment>
            {/* LOGIN FORM BEGINS HERE */}
            <form
              onSubmit={handleLoginSubmit}
              className="w-full h-full lg:px-24 p-6 py-6"
            >
              <h1 className="text-black text-[20px] font-sans font-bold mb-[15px]">
                Welcome
              </h1>

              <p className="font-normal font-sans mb-[20px] text-[#11111195]">
                Let's get you logged in
              </p>

              {/* {message && (
                <p
                  className={`${
                    isSuccess
                      ? "text-white font-semibold bg-green-400 px-3 py-1 text-base"
                      : "text-red-400 text-base"
                  } text-center`}
                >
                  {message}
                </p>
              )} */}

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

              <div className="relative">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={loginPass ? "text" : "password"}
                  onChange={handleLoginChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your Password"
                />

                {loginPass ? (
                  <img
                    onClick={() => setLoginPass(!loginPass)}
                    className="absolute right-3 top-9 cursor-pointer"
                    width={20}
                    height={20}
                    src={closeEye}
                    alt="user icon"
                  />
                ) : (
                  <img
                    onClick={() => setLoginPass(!loginPass)}
                    className="absolute right-3 top-9 cursor-pointer"
                    width={20}
                    height={20}
                    src={eye}
                    alt="user icon"
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#FF6700]">
                    <span onClick={() => handleRegister("password")}>
                      Forgot your password?
                    </span>
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className=" flex w-[80%] mx-auto justify-center mt-9 rounded-md border border-transparent bg-[#FF6700] py-3 px-4 text-sm font-medium text-white  focus:outline-none "
              >
                {isLoading && (
                  <svg
                    aria-hidden="true"
                    class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
                {!isLoading && "Sign In"}
              </button>
            </form>
            {/* LOGIN FORM ENDS HERE */}
          </React.Fragment>
        )}
        {PageState === "password" && (
          <React.Fragment>
            {/* LOGIN FORM BEGINS HERE */}
            <form
              onSubmit={handleforgotPasswordSubmit}
              className="w-full h-full lg:px-24 p-6 py-6"
            >
              <h1 className="text-black text-[20px] font-sans font-bold mb-[15px]">
                Reset Your Password
              </h1>

              <p className="font-normal font-sans mb-[20px] text-[#11111195]">
                Please provide your registered email below
              </p>

              {/* {message && (
                <p
                  className={`${
                    isSuccess
                      ? "text-white font-semibold bg-green-400 px-3 py-1 text-base"
                      : "text-red-400 text-base"
                  } text-center`}
                >
                  {message}
                </p>
              )} */}

              <div>
                <label htmlFor="email-address" className="text-sm">
                  E-mail
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={handleForgotPasswordChange}
                  className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
                  placeholder="Enter your e-mail"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span>
                    Note: If your email exists you will receive an email to
                    reset your password.
                  </span>
                  {/* <a href="#" className="font-medium text-[#FF6700]"> */}
                  {/* </a> */}
                </div>
              </div>

              <button
                type="submit"
                className=" flex w-[80%] mx-auto justify-center mt-9 rounded-md border border-transparent bg-[#FF6700] py-3 px-4 text-sm font-medium text-white  focus:outline-none "
              >
                {isLoading && (
                  <svg
                    aria-hidden="true"
                    class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
                {!isLoading && "send me reset password email"}
              </button>
            </form>
            {/* LOGIN FORM ENDS HERE */}
          </React.Fragment>
        )}

        {PageState === "register" ? (
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
          <p className="flex gap-1">
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
      {/* <div className="w-full h-full hidden  lg:flex items-center justify-center relative">
        <div className="fixed w-full h-screen"></div>
        <img className="z-10" src={login1} />
      </div> */}
    </div>
  );
};

export default Login;
