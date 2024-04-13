import React, { useState, useEffect } from "react";
// import logo from "../assets/logo.svg";
// import logo from "../assets/logo.jpg";
import logo from "../assets/charis-logo-transparent.png";
import profile from "../assets/user.svg";
import arr from "../assets/dwnArr.svg";
import logout from "../assets/logout.svg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../Redux/Features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutProperty, resetProperty } from "../Redux/Features/propertySlice";
import { userLogout } from "../Redux/Features/userSlice";
import { resetSingularPayment } from "../Redux/Features/SinglePaymentHistorySlice";
import {
  logOutAllUserPayment,
  resetAllUserPayment,
} from "../Redux/Features/allUserPaymentSlice";

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
  const { user, userDetails } = useSelector((state) => state.auth);

  const [active, setActive] = useState(localStorage.getItem("tab") || "2");
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState(false);

  const changeTab = (id) => {
    setActive(id.toString());
    if (id === 2) {
      navigate("/");
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
      if (!userDetails.userData.status === "paid") {
        navigate("dashboard");
        setNav(!nav);
      } else {
        setPrompt(true);
      }
    }
    if (id === 8) {
      navigate("/admin");
      setNav(!nav);
    }
  };

  const handleAffiliate = () => {
    if (userDetails.userData.affiliateUserName) {
      navigate("/affiliate/dashboard");
    } else {
      navigate("/affiliate");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    dispatch(userLogout());
    dispatch(logoutProperty());
    dispatch(resetSingularPayment());
    dispatch(logOutAllUserPayment());
    dispatch(logOut());
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
          // style={{ padding: "0" }}
          // width={60}
          // height={60}
          // className="md:h-[90px] cursor-pointer object-contain"
          className="nav-logo"
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

        {user?.email ? (
          <div
            onClick={() => setMenu(!menu)}
            className=" relative flex items-center justify-between p-2 px-4 lg:py-2 rounded-lg space-x-2 w-auto text-white text-sm bg-[#FF6700] cursor-pointer"
          >
            <img width={15} height={15} src={profile} alt="user icon" />
            <p>{user ? userDetails?.userData?.name : "Username"}</p>
            <img width={20} height={20} src={arr} alt="drop down arrow icon" />
            {menu && (
              <ul className="absolute top-[40px] flex flex-col gap-4 items-start justify-start right-0 h-max py-4 px-4 w-max bg-[#000000] z-30 rounded-md text-white">
                <li
                  onClick={() => changeTab(7)}
                  className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                >
                  <img width={15} height={15} src={profile} alt="user icon" />
                  Main Dashboard
                </li>

                <li
                  onClick={handleAffiliate}
                  className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                >
                  <img width={15} height={15} src={profile} alt="user icon" />
                  Affiliate Dashboard
                </li>

                {userDetails?.userData?.role === "admin" ? (
                  <li
                    onClick={() => changeTab(8)}
                    className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                  >
                    <img width={15} height={15} src={profile} alt="user icon" />
                    Admin Dashboard
                  </li>
                ) : null}

                <li
                  onClick={handleLogout}
                  className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                >
                  <img width={20} height={20} src={logout} alt="exit icon" />
                  Log Out
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className=" relative flex items-center justify-between p-2 px-4 lg:py-2 rounded-lg space-x-2 w-auto text-white text-sm bg-[#FF6700]"
          >
            <img width={15} height={15} src={profile} alt="user icon" />
            <p className="text-white font-semibold font-sans ">Sign In</p>
          </Link>
        )}
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
        onTouchMove={() => {
          setNav(false);
        }}
        className={
          !nav
            ? "red absolute left-0 top-16  opacity-0 flex-col justify-center items-center w-full overflow-hidden h-0"
            : "red lg:hidden z-30 pt-16 bg-[#fff] shadow-md shadow-black  text-sm absolute left-0 top-0 flex flex-col  justify-end items-start py-5 px-5 h-auto w-full text-left text-black capitalize font-bold duration-300 "
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

        {user ? (
          <div
            onClick={() => setMenu(!menu)}
            className=" relative flex items-center justify-between p-2 px-4 lg:py-2 rounded-lg space-x-2 w-auto text-white text-sm bg-[#FF6700]"
          >
            <img width={15} height={15} src={profile} alt="user icon" />
            <p>{userDetails ? userDetails?.userData?.name : "Username"}</p>
            <img width={20} height={20} src={arr} alt="drop down arrow icon" />
            {menu && (
              <ul className="absolute top-[40px] flex flex-col gap-4 items-start justify-start right-0 h-max py-4 px-4 w-max bg-[#000000] z-30 rounded-md text-white">
                <li
                  onClick={() => changeTab(7)}
                  className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                >
                  <img width={15} height={15} src={profile} alt="user icon" />
                  Main Dashboard
                </li>

                <li
                  onClick={handleAffiliate}
                  className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                >
                  <img width={15} height={15} src={profile} alt="user icon" />
                  Affiliate Dashboard
                </li>

                {userDetails?.userData?.role === "admin" ? (
                  <li
                    onClick={() => changeTab(8)}
                    className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                  >
                    <img width={15} height={15} src={profile} alt="user icon" />
                    Admin Dashboard
                  </li>
                ) : null}

                <li
                  onClick={handleLogout}
                  className="text-sm p-1 hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                >
                  <img width={20} height={20} src={logout} alt="exit icon" />
                  Log Out
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className=" relative flex items-center justify-between p-2 px-4 lg:py-2 rounded-lg space-x-2 w-auto text-white text-sm bg-[#FF6700]"
          >
            <img width={15} height={15} src={profile} alt="user icon" />
            <p className="text-white font-semibold font-sans ">Sign In</p>
          </Link>
        )}
      </ul>

      {prompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white flex flex-col gap-16 font-sans items-center lg:p-8 p-4 rounded-lg h-[40%] w-[500px] relative ">
            <div
              onClick={() => setPrompt(false)}
              className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
            >
              <h1 className="text-sm font-bold">X</h1>
            </div>
            <h1 className="text-2xl font-semibold font-sans text-[rgb(253,102,2)]">
              Not Eligible
            </h1>

            <p className="text-center text-lg">
              You are not an active member yet! Please complete the membership
              registration process
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
