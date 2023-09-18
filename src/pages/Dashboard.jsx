import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import dp from "../assets/dp.png";
import money from "../assets/money.svg";
import target from "../assets/target.svg";
import Lottie from "lottie-react";
import load from "../assets/loading.json";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentLink } from "../Redux/Features/paymentSlice";
import {
  getShareCapital,
  resetShareCapital,
} from "../Redux/Features/calculateShareCapitalSlice";

const Dashboard = () => {
  const [payModal, setPayModal] = useState(false);
  const [houseModal, setHouseModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [shareModal1, setShareModal1] = useState(false);
  const [selected, setSelected] = useState("");
  const [shareBody, setShareBody] = useState({
    houseAmount: "",
    spread: "",
  });

  const { user, userDetails } = useSelector((state) => state.auth);
  const { paymentStatus, paymentLoading } = useSelector(
    (state) => state.payment
  );
  const {
    shareCapital,
    calculateShareLoading,
    calculateShareSuccess,
    calculateShareError,
    calculateShareMessage,
  } = useSelector((state) => state.shareCapital);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = (option) => {
    setSelected(option);
  };

  function formatNumber(number) {
    // Check if the input is a valid number
    if (isNaN(number)) {
      return "Invalid Number";
    }

    // Convert the number to a string
    const numberString = number.toString();

    // Format the integer part by adding thousands separators
    const formattedIntegerPart = numberString.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    return formattedIntegerPart;
  }

  const nextStep = () => {
    if (selected === "house") {
      setPayModal(false);
      setHouseModal(true);
    }
    if (selected === "share") {
      setPayModal(false);
      setShareModal(true);
    }
  };

  const handlePayment = () => {
    if (selected === "house") {
      const reqBody = {
        amount: "50000",
        redirect: "http://localhost:5173/verify",
        tag: selected,
      };
      dispatch(createPaymentLink(reqBody));
    }

    if (selected === "share") {
      const reqBody = {
        amount: shareCapital.shareCapital,
        redirect: "http://localhost:5173/verify",
        tag: selected,
      };
      dispatch(createPaymentLink(reqBody));
    }
  };

  const sharedBodyAmount = (number) => {
    setShareBody({
      ...shareBody,
      houseAmount: number + "000000",
    });
    setShareModal(false);
    setShareModal1(true);
  };

  const getCapital = () => {
    setShareModal1(false);
    if (shareBody.houseAmount && shareBody.spread) {
      const formBody = {
        spread: shareBody.spread,
        houseAmount: shareBody.houseAmount,
      };
      dispatch(getShareCapital(formBody));
    } else console.log("wahala dey o");
  };

  const numbers = Array.from({ length: 50 }, (_, index) => index + 1);
  const months = Array.from({ length: 30 }, (_, index) => index + 1);

  useEffect(() => {
    if (paymentStatus) {
      window.location.href = paymentStatus.response.data.link;
    }
  }, [paymentStatus]);

  useEffect(() => {
    console.log(shareBody.spread);
  }, [shareBody.spread]);

  useEffect(() => {
    if (calculateShareSuccess) {
      setInfoModal(true);
      dispatch(resetShareCapital());
    }
    if (calculateShareError) {
      toast.error(calculateShareMessage);
      dispatch(resetShareCapital());
    }
  }, [calculateShareSuccess, calculateShareError, calculateShareMessage]);

  return (
    <React.Fragment>
      <ToastContainer position="top-center" hideProgressBar />
      {user ? (
        <div className="w-full h-full lg:flex gap-[60px] px-5 lg:px-[70px] mb-10 mt-10">
          <div className="lg:flex-1 w-full h-full">
            {/* DASHBOARD BANNER */}
            <div className="w-full  lg:px-0 h-[230px] aspect-auto rounded-[10px] profile-banner bg-cover lg:bg-cover bg-no-repeat bg-left flex flex-col items-center justify-center">
              <div className="lg:w-[500px] flex flex-col gap-4 lg:gap-1 lg:pl-5 w-full px-5 h-full lg:h-auto pt-10 lg:pt-0 lg:mt-0 bg-black/60 lg:bg-transparent">
                <h1 className="text-white/70 text-sm font-extralight text-left">
                  Hi,{" "}
                  {userDetails ? userDetails?.userData?.name : "user's name"}
                </h1>
                <h1 className="text-white text-xl font-medium my-1 text-left">
                  Welcome to your Client Dashboard
                </h1>
                <h1 className="text-white/70 text-sm font-extralight text-left">
                  Here, You can track your payment , View your profile status ,
                  get a loan and so much more
                </h1>
              </div>
            </div>

            {/* CARD SECTION STARTS HERE */}
            <div className="w-full lg:flex gap-8 h-max mt-3">
              <div className="h-[185px] w-full lg:w-full bg-white shadow-md shadow-black/30 pt-2 px-3 rounded-[5px]">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">Savings</p>
                  <img src={money} className="bg-[#FD6602] p-1" />
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest mt-8">
                  N0.00
                </p>

                {/* BOTTOM CARD SECTION*/}
                <div className="flex items-center justify-between text-xs mt-8">
                  <p className="w-[200px]">
                    Note: Next payment coming up 10 August,2023
                  </p>
                  <div className="bg-black px-2 py-1 rounded-[5px] text-white text-center text-xs w-max">
                    pay now
                  </div>
                </div>
              </div>

              <div className="h-[185px] w-full lg:w-full bg-white shadow-md shadow-black/30 pt-2 px-3 rounded-[5px] mt-9 lg:mt-0">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">House Payment</p>
                  <img src={target} className="bg-[#FD6602] p-1" />
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest mt-8">
                  N0.00
                </p>
              </div>

              <div className="h-[185px] w-full lg:w-full bg-white shadow-md shadow-black/30 pt-2 px-3 rounded-[5px] mt-9 lg:mt-0">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">House Target</p>
                  <img src={target} className="bg-[#FD6602] p-1" />
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest mt-8">
                  N0.00
                </p>
              </div>
            </div>

            <h1 className="text-lg font-bold mt-10">Payment History</h1>

            <div className="w-full overflow-x-auto">
              <table className="mt-10 w-full table-auto">
                <thead className="w-full">
                  <tr className="text-black/50 font-extralight">
                    <th className="text-left pb-2">Name</th>
                    <th className="text-left pb-2">Amount</th>
                    <th className="text-left pb-2">Date</th>
                    <th className="text-left pb-2">Status</th>
                    <th className="text-left pb-2">Ref</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="pb-2 pr-8">Umoru Emmanuel</td>
                    <td className="pb-2 pr-8">N20,000</td>
                    <td className="pb-2 pr-8">01/08/2023</td>
                    <td className="pb-2 pr-8 text-green-400">Successful</td>
                    <td className="pb-2 pr-8">0011054FY</td>
                  </tr>
                  <tr>
                    <td className="pb-2 pr-8">Umoru Emmanuel</td>
                    <td className="pb-2 pr-8">N20,000</td>
                    <td className="pb-2 pr-8">01/08/2023</td>
                    <td className="pb-2 pr-8 text-green-400">Successful</td>
                    <td className="pb-2 pr-8">0011054FY</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:w-[330px] w-full h-full mt-10 lg:mt-0">
            {/* NAVIGATION BUTTON */}
            <div
              onClick={() => navigate("/")}
              className="w-full h-[32px] flex bg-black items-center justify-center gap-5 rounded-[5px] cursor-pointer"
            >
              <h1 className="text-white">Go back to website</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M11.8 19.3C11.6167 19.1167 11.5207 18.8834 11.512 18.6C11.5033 18.3167 11.591 18.0834 11.775 17.9L16.675 13H5.5C5.21667 13 4.979 12.904 4.787 12.712C4.595 12.52 4.49934 12.2827 4.5 12C4.5 11.7167 4.596 11.479 4.788 11.287C4.98 11.095 5.21734 10.9994 5.5 11H16.675L11.775 6.10005C11.5917 5.91672 11.504 5.68338 11.512 5.40005C11.52 5.11672 11.616 4.88338 11.8 4.70005C11.9833 4.51672 12.2167 4.42505 12.5 4.42505C12.7833 4.42505 13.0167 4.51672 13.2 4.70005L19.8 11.3C19.9 11.3834 19.971 11.4877 20.013 11.613C20.055 11.7384 20.0757 11.8674 20.075 12C20.075 12.1334 20.0543 12.2584 20.013 12.375C19.9717 12.4917 19.9007 12.6 19.8 12.7L13.2 19.3C13.0167 19.4834 12.7833 19.575 12.5 19.575C12.2167 19.575 11.9833 19.4834 11.8 19.3Z"
                  fill="#F5F5F5"
                />
              </svg>
            </div>

            {/* PROFILE SECTION */}
            <div className="flex flex-col w-full h-full items-center justify-center lg:px-[28px] px-5 mt-5 bg-white shadow-md shadow-black/30">
              {/* PROFILE SECTION STARTS HERE */}
              {userDetails?.userData?.imageLink ? (
                <img
                  src={userDetails?.userData?.imageLink}
                  alt="profile image"
                  className="w-[138px] h-[138px] rounded-full mt-10 object-cover mb-5"
                />
              ) : (
                <div className="w-[138px] h-[138px] bg-[#eeeeee] rounded-full mt-10 mb-5 flex items-center justify-center text-center">
                  Profile Image
                </div>
              )}

              <h1 className="font-bold text-xl">
                {userDetails ? userDetails?.userData?.name : "user's Name"}
              </h1>
              <p className="text-black/70">(Active User)</p>

              <p className="text-black/70 mt-8">
                {userDetails ? userDetails?.userData?.email : "user's Email"}
                {/* Umoru.emmanuel@yahoo.com */}
              </p>
              <p className="text-black/70">
                {userDetails
                  ? userDetails?.userData?.phoneNumber
                  : "user's Phone Number"}
              </p>

              <div className="w-full flex gap-4 items-center">
                <div className="bg-[rgb(253,102,2)] w-full h-[20px] py-[15px] px-[15px] rounded-[5px] flex items-center justify-center my-7 text-white">
                  Get a loan
                </div>
                <div
                  onClick={() => setPayModal(true)}
                  className="bg-[#000] w-full h-[20px] py-[15px] px-[5px] rounded-[5px] flex items-center justify-center my-7 text-white text-sm"
                >
                  Pay
                </div>
              </div>
              {/* PROFILE SECTION ENDS HEREm*/}

              {/* ONLINE STORE DISPLAY STARTS HERE */}
              <div className="lg:w-[280px] w-full h-[231px] bg-no-repeat bg-center shop-banner object-cover rounded-[10px] mb-20 px-5">
                <div className="w-[92px] h-[24px] bg-white rounded-[10px] mt-4 flex items-center justify-center">
                  <p className="text-xs text-center">Shop Online</p>
                </div>

                <p className="text-sm mt-3 text-white">
                  Shop through our platform and get a Discount
                </p>
              </div>
              {/* ONLINE STORE DISPLAY ENDS HERE */}

              {/* CARD DISPLAY STARTS HERE */}
              <div className="lg:w-[290px] w-full bg-no-repeat bg-center h-[178px] card-banner  object-cover rounded-[20px] mb-10 px-5 ">
                <p className="text-white/70 font-extralight mt-5 text-xs">
                  Debit Naira
                </p>
                <p className="text-white/70 w-[240px] font-extralight mt-[40px] text-sm flex items-center justify-between ">
                  <span className="tracking-widest font-extralight">
                    {" "}
                    2259{" "}
                  </span>
                  <span className="tracking-widest font-extralight">
                    {" "}
                    4122{" "}
                  </span>
                  <span className="tracking-widest font-extralight">
                    {" "}
                    7956{" "}
                  </span>
                  <span className="tracking-widest font-extralight">
                    {" "}
                    2812{" "}
                  </span>
                </p>
                <p className="text-white/70 font-extralight mt-2 text-xs">
                  12/25
                </p>
                <p className="text-white/70 font-bold mt-3 text-sm">
                  Umoru Emmanuel
                </p>
              </div>
              {/* CARD DISPLAY ENDS HERE */}
            </div>
          </div>

          {payModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-7 font-sans items-center lg:p-8 p-4 rounded-lg h-[40%] w-[550px] relative ">
                <div
                  onClick={() => setPayModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <p className="text-center font-semibold font-sans">
                  Payment Options
                </p>

                <ul className="flex flex-col gap-3 items-center w-full cursor-pointer">
                  <li
                    onClick={() => handleSelect("house")}
                    className={`hover:text-xl hover:bg-[#d9d9d9] ${
                      selected === "house" && "text-xl bg-[#d9d9d9] text-black"
                    }  transition-all duration-200 ease-linear hover:text-black w-max p-1 px-[10px] rounded-md text-black/50 `}
                  >
                    House Application
                  </li>
                  <li
                    onClick={() => handleSelect("share")}
                    className={`hover:text-xl hover:bg-[#d9d9d9] ${
                      selected === "share" && "text-xl bg-[#d9d9d9] text-black"
                    }  transition-all duration-200 ease-linear hover:text-black w-max p-1 px-[10px] rounded-md text-black/50 `}
                  >
                    Share Capital
                  </li>
                  <li
                    onClick={() => handleSelect("invest")}
                    className={`hover:text-xl hover:bg-[#d9d9d9] ${
                      selected === "invest" && "text-xl bg-[#d9d9d9] text-black"
                    }  transition-all duration-200 ease-linear hover:text-black w-max p-1 px-[10px] rounded-md text-black/50 `}
                  >
                    Invest
                  </li>
                </ul>

                <div
                  onClick={nextStep}
                  className="w-max p-3 rounded-md px-[30px] bg-[#FD6602] text-white font-bold font-sans "
                >
                  Continue
                </div>
              </div>
            </div>
          )}

          {houseModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-28 font-sans items-center lg:p-8 p-4 rounded-lg h-[40%] w-[250px] relative ">
                <div
                  onClick={() => setHouseModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <p className="text-center font-medium font-sans">
                    House Application Fee
                  </p>

                  <p className="font-semibold text-3xl text-center">N50,000</p>
                </div>

                {/* CONTINUE BUTTON STARTS HERE */}
                <div
                  onClick={handlePayment}
                  className="w-max p-3 rounded-md px-[30px] bg-[#FD6602] text-white font-bold font-sans "
                >
                  {paymentLoading ? "Processing" : "Continue"}
                </div>
                {/* CONTINUE BUTTON ENDS HERE  */}
              </div>
            </div>
          )}

          {shareModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-20 font-sans items-center lg:p-8 p-4 rounded-lg h-[70%] w-[500px] relative ">
                <div
                  onClick={() => setShareModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
                  {numbers.map((number) => (
                    <li
                      onClick={() => sharedBodyAmount(number)}
                      className="w-full hover:text-xl hover:bg-[#d9d9d9] transition-all duration-200 ease-linear hover:text-black text-center  cursor-pointer p-1 px-[10px] rounded-md text-black/50"
                      key={number}
                    >
                      {number + " Million Naira"}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          )}

          {shareModal1 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-20 font-sans items-center lg:p-8 p-4 rounded-lg h-[70%] w-[500px] relative ">
                <div
                  onClick={() => setShareModal1(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <div className="w-full h-[50%] overflow-y-auto flex flex-col gap-2">
                  {months.map((month) => (
                    <li
                      onClick={() =>
                        setShareBody({
                          ...shareBody,
                          spread: month,
                        })
                      }
                      className={`w-full ${
                        shareBody.spread === month &&
                        "text-xl bg-[#d9d9d9] text-black"
                      }  hover:text-xl hover:bg-[#d9d9d9] transition-all duration-200 ease-linear hover:text-black text-center  cursor-pointer p-1 px-[10px] rounded-md text-black/50`}
                      key={month}
                    >
                      {month > 1 ? month + " Years" : month + " Year"}
                    </li>
                  ))}
                </div>

                <div
                  onClick={getCapital}
                  className="w-max p-3 rounded-md px-[30px] bg-[#FD6602] text-white font-bold font-sans "
                >
                  Continue
                </div>
              </div>
            </div>
          )}

          {infoModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-20 font-sans items-center lg:p-8 p-4 rounded-lg h-[40%] w-[500px] relative ">
                <div
                  onClick={() => setInfoModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-black/50 ">House Target Amount</p>
                    <h1 className="text-xl">
                      {formatNumber(shareBody.houseAmount)}
                    </h1>
                  </div>
                  <div>
                    <p className="text-black/50 ">Duration</p>
                    <h1 className="text-xl">
                      {shareBody.spread > 1
                        ? shareBody.spread + " Years"
                        : shareBody.spread + " year"}
                    </h1>
                  </div>
                </div>

                <div className="w-full flex items-center justify-between">
                  <div>
                    <p className="text-black/50 ">Share Capital</p>
                    <h1 className="text-xl">
                      {shareCapital &&
                        "N" + formatNumber(shareCapital.shareCapital)}
                    </h1>
                  </div>

                  <div
                    onClick={handlePayment}
                    className="w-max p-3 rounded-md px-[30px] bg-[#FD6602] text-white font-bold font-sans "
                  >
                    {paymentLoading ? "Processing" : "Continue"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {calculateShareLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
              <div className="bg-transparent lg:p-8 p-4 rounded-lg h-max w-[300px] relative overflow-y-auto">
                <Lottie
                  animationData={load}
                  width={200}
                  height={200}
                  loop={true}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </React.Fragment>
  );
};

export default Dashboard;
