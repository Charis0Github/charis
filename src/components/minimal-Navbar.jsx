import React from "react";
import logo from "../assets/charis-logo-transparent.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profile from "../assets/user.svg";

const NavbarMinimal = () => {
  const { user, userDetails } = useSelector((state) => state.auth);

  return (
    <div className="navoir h-[67px] w-full shadow-sm shadow-black lg:shadow-none  px-4 md:px-10 lg:px-[64px] lg:pt-2 flex justify-between items-center z-30">
      <div className="w-full">
        <img className="nav-logo mt-4" src={logo} alt="logo" />
      </div>

      <ul className="hidden lg:space-x-5  cursor-pointer text-sm lg:flex lg:items-center justify-start md:w-80 lg:w-[80rem] text-[#1111118b] capitalize font-normal">
        <a href="/">
          <li className={"text-blue-50 text-xl"}>Home</li>
        </a>
        <a href="/property">
          <li className={"active text-blue-50 text-xl"}>Properties</li>
        </a>
        <a href="/list-property">
          <li className={"text-blue-50 text-xl"}>List Property</li>
        </a>
        {user && (
          <a href="/dashboard">
            <li className={"text-blue-50 text-xl"}>Main Dashboard</li>
          </a>
        )}
        {!user && (
          <a href="/login">
            <li className="text-sm p-2 bg-[#FF6700] hover:bg-blue-200 px-2 flex items-center justify-center rounded-xl gap-3">
              Log In
              <img width={20} height={20} alt="exit icon" src={profile} />
            </li>
          </a>
        )}
      </ul>
    </div>
  );
};
export default NavbarMinimal;
