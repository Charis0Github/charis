import React, { useEffect, useState } from "react";
import login1 from "../assets/login1.png";
import welcom from "../assets/welcom.jpeg";
import eye from "../assets/eye-open.svg";
import closeEye from "../assets/eye-close.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  getUserDetails,
  resetPassword,
} from "../Redux/Features/authSlice";
import { toast } from "react-hot-toast";

const ResetPasswordPage = () => {
  const pageState = new URLSearchParams(location.search).get("token");
  // console.log({ pageState });
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

  const [loginForm, setLoginForm] = useState({
    resetToken: pageState,
    newPassword: "",
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setLoginForm({ ...loginForm, [name]: value });
  };
  const handleRegister = (data) => {
    if (data === "login") {
      localStorage.setItem("pageState", "login");
      location.pathname = "/login";
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formData = {
      resetCode: loginForm.resetToken,
      newPassword: loginForm.newPassword,
    };
    dispatch(resetPassword(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);

      setRegister(!register);
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

        <form
          onSubmit={handleLoginSubmit}
          className="w-full h-full lg:px-24 p-6 py-6"
        >
          <h1 className="text-black text-[20px] font-sans font-bold mb-[15px]">
            Set your new password
          </h1>

          <p className="font-normal font-sans mb-[20px] text-[#11111195]">
            Provide a new password below
          </p>

          <div className="relative">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id="password"
              name="newPassword"
              type={loginPass ? "text" : "password"}
              onChange={handleLoginChange}
              className="relative block w-full appearance-none rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-gray-900 placeholder-[#11111195] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
              placeholder="Enter your new Password"
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
            {!isLoading && "Set new Password"}
          </button>
        </form>

        <p>
          Already Have an Account?
          <span
            onClick={() => handleRegister("login")}
            className="text-[#0106A0] cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
