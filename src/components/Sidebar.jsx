import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import admin_logo from "../assets/admin_logo.svg";
import user_icon from "../assets/user_icon.svg";
import user_icon_inactive from "../assets/user_icon_inactive.svg";
import property_icon from "../assets/property_icon.svg";
import affiliate_icon from "../assets/affiliate_icon.svg";
import settings_icon_inactive from "../assets/settings_icon_inactive.svg";
import payment_icon from "../assets/payment_icon.svg";
import payment_icon_inactive from "../assets/payment_icon_inactive.svg";
import property_icon_inactive from "../assets/property_icon_inactive.svg";
import affiliate_icon_inactive from "../assets/affiliate_icon_inactive.svg";

const Sidebar = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const menus = [
    {
      name: "Users",
      path: "",
      icon: user_icon,
      ic: user_icon_inactive,
    },
    {
      name: "Payment History",
      path: "payment",
      icon: payment_icon,
      ic: payment_icon_inactive,
    },
    {
      name: "Property Page",
      path: "property",
      icon: property_icon,
      ic: property_icon_inactive,
    },
    {
      name: "Affiliates",
      path: "affiliates",
      icon: affiliate_icon,
      ic: affiliate_icon_inactive,
    },
    {
      name: "Settings",
      path: "settings",
      icon: settings_icon_inactive,
      ic: settings_icon_inactive,
    },
  ];

  const findIndex = (index) => {
    setCurrent(index);
  };

  return (
    <div className="w-full lg:max-w-[286px]  lg:flex flex-col lg:min-h-screen bg-black/10 rounded-r-xl ">
      <div className="flex flex-col items-center justify-between w-full h-full ">
        <div className="flex flex-col gap-1">
          <div
            onClick={() => navigate("/")}
            className="w-full cursor-pointer flex flex-col items-start justify-center py-2 gap-y-1 rounded-r-xl"
          >
            <img
              className="w-[150px] h-[100px] mb-1 object-contain"
              src={admin_logo}
              alt="logo"
            />
          </div>
          {/* SECTION ONE  START*/}
          <ul className=" w-full flex flex-col gap-y-4 items-center justify-center  mt-3">
            {menus.map((menu, index) => (
              <Link
                onClick={() => findIndex(index)}
                to={menu.path}
                key={index}
                style={{
                  background: current === index ? "#FF6700" : "transparent",
                }}
                className={
                  current === index
                    ? "flex items-center text-sm font-medium text-left p-3 justify-start text-white rounded-lg w-[188px] gap-x-4 cursor-pointer"
                    : "flex items-center text-sm font-medium text-left p-3 justify-start text-black rounded-lg w-[188px] gap-x-4 cursor-pointer"
                }
              >
                <img
                  className="fill-white p-0"
                  src={current === index ? menu.icon : menu.ic}
                />
                {menu.name}
              </Link>
            ))}
          </ul>
          {/* SECTION ONE  END*/}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
