import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import profile from "../assets/user.svg";
import arr from "../assets/dwnArr.svg";
import logout from "../assets/logout.svg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Redux/Features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      id: 2,
      text: "Home",
    },
    {
      id: 3,
      text: "About us",
    },
    {
      id: 4,
      text: "Contact us",
    },
    {
      id: 5,
      text: "Blog post",
    },
    {
      id: 6,
      text: "Events and News",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [active, setActive] = useState(localStorage.getItem("tab") || "2");
  const [menu, setMenu] = useState(false);

  const changeTab = (id) => {
    setActive(id.toString());
    if (id === 2) {
      navigate("/layout");
      setNav(!nav);
    }
    if (id === 3) {
      navigate("about");
      setNav(!nav);
    }
    if (id === 4) {
      navigate("contact");
      setNav(!nav);
    }
    if (id === 5) {
      navigate("blog");
      setNav(!nav);
    }
    if (id === 6) {
      navigate("event");
      setNav(!nav);
    }
    if (id === 7) {
      navigate("dashboard");
      setNav(!nav);
    }
  };

  useEffect(() => {
    localStorage.setItem("tab", active);
  }, [active]);

  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="h-[67px] w-full shadow-sm shadow-black lg:shadow-none  px-4 md:px-10 lg:px-[64px] lg:pt-2 flex justify-between items-center z-30">
      <div className="z-50 w-full">
        <img
          style={{ padding: "0" }}
          width={60}
          height={60}
          className="md:h-[90px] cursor-pointer object-contain"
          src={logo}
          alt="logo"
        />
      </div>

      <ul className="hidden lg:space-x-5  cursor-pointer text-sm lg:flex lg:items-center justify-between md:w-80 lg:w-[120rem] text-[#1111118b] capitalize font-normal">
        {links.map((link) => (
          <li
            className={active === link.id.toString() ? "active" : ""}
            onClick={() => changeTab(link.id)}
            key={link.id}
          >
            {link.text}
          </li>
        ))}

        <div
          onClick={() => setMenu(!menu)}
          className=" relative flex items-center justify-between p-2 px-4 lg:py-2 rounded-lg space-x-2 w-auto text-white text-sm bg-[#FF6700]"
        >
          <img width={15} height={15} src={profile} alt="user icon" />
          <p>{user ? user.user.name : "Username"}</p>
          <img width={20} height={20} src={arr} alt="drop down arrow icon" />
          {menu && (
            <ul className="absolute top-[40px] flex flex-col gap-4 items-start justify-start left-0 h-max py-4 px-4 w-max bg-[#000000] z-30 rounded-md text-white">
              <li
                onClick={() => changeTab(7)}
                className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
              >
                <img width={15} height={15} src={profile} alt="user icon" />
                Main Dashboard
              </li>

              <li className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3">
                <img width={15} height={15} src={profile} alt="user icon" />
                Affiliate Dashboard
              </li>

              <li
                onClick={() => dispatch(logOut())}
                className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
              >
                <img width={20} height={20} src={logout} alt="exit icon" />
                Log Out
              </li>
            </ul>
          )}
        </div>
      </ul>

      <div className="lg:hidden z-50">
        {!nav ? (
          <HiMenuAlt3
            className="h-8 w-8"
            style={{ color: "#0106A0" }}
            onClick={handleNav}
          />
        ) : (
          <AiOutlineClose
            className="h-8 w-8"
            style={{ color: "#0106A0" }}
            onClick={handleNav}
          />
        )}
      </div>

      <ul
        className={
          !nav
            ? "absolute left-0 top-16  opacity-0 flex-col justify-center items-center w-full overflow-hidden h-0"
            : "lg:hidden z-30 pt-16 bg-[#fff] shadow-md shadow-black  text-sm absolute left-0 top-0 flex flex-col  justify-end items-start py-5 px-5 h-auto w-full text-left text-black capitalize font-bold duration-300 "
        }
      >
        {links.map((link) => (
          <li
            className=" border-[#0106A0] border-b-2 w-full px-2 my-2 py-3"
            onClick={() => changeTab(link.id)}
            key={link.id}
          >
            {link.text}
          </li>
        ))}

        <div
          onClick={() => setMenu(!menu)}
          className=" relative flex items-center justify-between p-2 px-4 lg:py-2 rounded-lg space-x-2 w-auto text-white text-sm bg-[#FF6700]"
        >
          <img width={15} height={15} src={profile} alt="user icon" />
          <p>{user ? user.user.name : "User Name"}</p>
          <img width={20} height={20} src={arr} alt="drop down arrow icon" />

          {menu && (
            <ul className="absolute top-[40px] flex flex-col gap-4 items-start justify-start left-0 h-max py-4 px-4 w-max bg-[#000000] z-50 rounded-md text-white">
              <li
                onClick={() => changeTab(7)}
                className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
              >
                <img width={15} height={15} src={profile} alt="user icon" />
                Main Dashboard
              </li>

              <li className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3">
                <img width={15} height={15} src={profile} alt="user icon" />
                Affiliate Dashboard
              </li>

              <li
                onClick={() => dispatch(logOut())}
                className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
              >
                <img width={20} height={20} src={logout} alt="exit icon" />
                Log Out
              </li>
            </ul>
          )}
        </div>
      </ul>
    </div>
  );
};
export default Navbar;
