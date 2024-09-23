import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import dp from "../assets/dp.png";
import money from "../assets/money.svg";
import target from "../assets/target.svg";
import add from "../assets/add.svg";
import Lottie from "lottie-react";
import load from "../assets/loading.json";
import ReactPaginate from "react-paginate";
import { GrRefresh } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import {
  createPaymentLink,
  resetPaymentMini,
} from "../Redux/Features/paymentSlice";
import {
  getShareCapital,
  resetShareCapital,
} from "../Redux/Features/calculateShareCapitalSlice";
import {
  getSinglePayment,
  resetSinglePayment,
} from "../Redux/Features/SinglePaymentHistorySlice";
import Input from "../components/Input";
import {
  getROI,
  resetCalculateInvestment,
} from "../Redux/Features/calculateInvestment";
import {
  imageUpload,
  resetImageUpload,
} from "../Redux/Features/uploadImageSlice";
import { getUserDetails } from "../Redux/Features/authSlice";
import {
  checkEligibility,
  resetEigibility,
} from "../Redux/Features/eligibilitySlice";

import { toast } from "react-hot-toast";
import { UploadDocumentSection } from "../components/HomeDocumentSubmitionList";

const Dashboard = () => {
  const [payModal, setPayModal] = useState(false);
  const [houseModal, setHouseModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [infoModal1, setInfoModal1] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [shareModal1, setShareModal1] = useState(false);
  const [partShareModal, setPartShareModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [investModal, setInvestModal] = useState(false);
  const [investModal1, setInvestModal1] = useState(false);
  const [savingsModal, setSavingsModal] = useState(false);
  const [monthlyModal, setMonthlyModal] = useState(false);
  const [wdrawal, setWdrawal] = useState(false);
  const [noImg, setNoImg] = useState(false);
  const [selected, setSelected] = useState("");
  const {
    singlePaymentHistory,
    singlePaymentLoading,
    singlePaymentSuccess,
    singlePaymentError,
    singlePaymentMessage,
  } = useSelector((state) => state.singleUserPayment);

  const {
    imageUploadLoading,
    imageUploadSuccess,
    imageUploadError,
    imageUploadMessage,
  } = useSelector((state) => state.imgUpload);

  const {
    loanEligibleLoading,
    loanEligibleSuccess,
    loanEligibleError,
    loanEligibleMessage,
    loanEligible,
  } = useSelector((state) => state.eligible);

  const [shareBody, setShareBody] = useState({
    houseAmount: "",
    spread: "",
  });

  const [investBody, setInvestBody] = useState({
    amount: "",
    spread: "",
  });

  const [savingsBody, setSavingsBody] = useState({
    amount: "",
  });

  const [file, setFile] = useState(null);

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10;
  const firstIndex = pageNumber * itemsPerPage;

  const display =
    singlePaymentHistory &&
    singlePaymentHistory?.payments
      .slice(firstIndex, firstIndex + itemsPerPage)
      .map((item) => {
        return (
          <tr key={item._id}>
            {/* <td className="pb-2 pr-8">Umoru Emmanuel</td> */}
            <td className="pb-2 pr-8">N {formatNumber(item.amount)}</td>
            <td className="pb-2 pr-8">{formatDate(item.datePaid)}</td>
            <td className="pb-2 pr-8 text-green-400">Successful</td>
            <td className="pb-2 pr-8">{item.transactionId}</td>
          </tr>
        );
      });

  const pageCount = Math.ceil(
    singlePaymentHistory?.payments.length / itemsPerPage
  );

  const changePage = (selected) => {
    setPageNumber(selected.selected);
    // console.log("selected Number" + selected);
  };

  const { user, userDetails } = useSelector((state) => state.auth);
  const { paymentStatus, paymentLoading, paymentSuccess } = useSelector(
    (state) => state.payment
  );

  const {
    shareCapital,
    calculateShareLoading,
    calculateShareSuccess,
    calculateShareError,
    calculateShareMessage,
  } = useSelector((state) => state.shareCapital);

  const {
    investmentData,
    calculateInvestmentLoading,
    calculateInvestmentSuccess,
    calculateInvestmentError,
    calculateInvestmentMessage,
  } = useSelector((state) => state.calculateInvest);

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
      if (userDetails?.userData?.houseMembershipStatus === "paid") {
        toast.error("House application payment has already been made!");
      } else {
        setPayModal(false);
        setHouseModal(true);
      }
    }

    if (selected === "share") {
      if (
        userDetails?.userData?.houseMembershipStatus === "paid" &&
        userDetails?.userData?.shareCapitalStatus === "not-paid"
      ) {
        setPayModal(false);
        setShareModal(true);
      }

      if (
        userDetails?.userData?.houseMembershipStatus === "paid" &&
        userDetails?.userData?.shareCapitalStatus === "part-paid"
      ) {
        setPayModal(false);
        setPartShareModal(true);
      }

      if (
        userDetails?.userData?.houseMembershipStatus !== "paid" &&
        userDetails?.userData?.shareCapitalStatus !== "paid"
      ) {
        toast.error("You need to Pay your house application fee first!");
      }

      if (userDetails?.userData?.shareCapitalStatus === "paid") {
        toast.error("Share capital payment has already been made!");
      }
    }

    if (selected === "invest") {
      if (userDetails?.userData?.investmentAmount !== 0) {
        toast.error("House application payment has already been made!");
      } else {
        setPayModal(false);
        setInvestModal(true);
      }
    }
  };

  // const localRedirect = "http://localhost:5173/verify";
  const vercelRedirect = "https://charis-eight.vercel.app/verify";
  const liveRedirect = "https://calgi.org/verify";

  const handlePayment = () => {
    if (selected === "house") {
      const reqBody = {
        amount: "100000",
        redirect: liveRedirect,
        tag: selected,
      };
      dispatch(createPaymentLink(reqBody));
    }

    if (selected === "share") {
      if (userDetails?.userData?.shareCapitalLeft > 499000) {
        const reqBody = {
          amount: 490000,
          redirect: liveRedirect,
          tag: selected,
        };
        dispatch(createPaymentLink(reqBody));
      } else {
        const reqBody = {
          amount: userDetails?.userData?.shareCapitalLeft,
          redirect: liveRedirect,
          tag: selected,
        };
        dispatch(createPaymentLink(reqBody));
      }
    }

    if (selected === "invest") {
      const reqBody = {
        amount: investmentData.investmentAmount,
        redirect: liveRedirect,
        tag: selected,
      };
      dispatch(createPaymentLink(reqBody));
    }

    if (selected === "savings") {
      const reqBody = {
        amount: savingsBody.amount,
        redirect: liveRedirect,
        tag: selected,
      };
      dispatch(createPaymentLink(reqBody));
    }
    if (selected === "monthly") {
      const reqBody = {
        amount: userDetails?.userData?.monthlyHousePayment,
        redirect: liveRedirect,
        tag: selected,
      };
      dispatch(createPaymentLink(reqBody));
    }
  };

  //
  const sharedBodyAmount = (number) => {
    setShareBody({
      ...shareBody,
      houseAmount: number + "000000",
    });
    setShareModal(false);
    setShareModal1(true);
  };

  // AFTER INVESTMENT AMOUNT NEXT STEP
  const nextStepInvest = () => {
    setInvestModal(false);
    setInvestModal1(true);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

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

  const getinvetsment = () => {
    setInvestModal1(false);
    if (investBody.amount && investBody.spread) {
      const formBody = {
        spread: investBody.spread,
        amount: investBody.amount,
      };
      dispatch(getROI(formBody));
    } else console.log("wahala dey o");
  };

  const setImg = () => {
    if (file) {
      const body = {
        file: file,
      };
      dispatch(imageUpload(body));
    }
  };

  const numbers = Array.from({ length: 50 }, (_, index) => index + 1);
  const months = Array.from({ length: 30 }, (_, index) => index + 1);

  useEffect(() => {
    if (paymentSuccess) {
      window.location.href = paymentStatus.response.data.link;
      dispatch(resetPaymentMini());
    }
  }, [paymentSuccess]);

  // useEffect(() => {
  //   dispatch(getSinglePayment());
  // }, [singlePaymentHistory]);

  useEffect(() => {
    // if (!singlePaymentHistory) {
    //   dispatch(getSinglePayment());
    // }

    // if ("imageLink" in userDetails.userData) {
    //   setNoImg(false);
    //   console.log(noImg);
    // } else {
    //   console.log(noImg);
    //   setNoImg(true);
    // }
    return () => {
      console.log("This should work");
      dispatch(resetPaymentMini());
    };
  }, []);

  useEffect(() => {
    if (loanEligibleSuccess) {
      // toast.success("it worked");
      dispatch(resetEigibility());
    }
    if (loanEligibleError) {
      toast.error(
        "To qualify for a loan you need to have been part of the co-operative for at least 6 months"
      );
      dispatch(resetEigibility());
    }
  }, [loanEligibleSuccess, loanEligibleError, loanEligibleMessage]);

  useEffect(() => {
    if (calculateShareSuccess) {
      setInfoModal(true);
      dispatch(getUserDetails());
      dispatch(resetShareCapital());
    }
    if (calculateShareError) {
      toast.error(calculateShareMessage);
      dispatch(resetShareCapital());
    }
  }, [calculateShareSuccess, calculateShareError, calculateShareMessage]);

  useEffect(() => {
    if (imageUploadSuccess) {
      toast.success("Image Uploaded Successfully");
      dispatch(getUserDetails());
      setTimeout(() => {
        dispatch(resetImageUpload());
      }, 2000);
    }
    if (imageUploadError) {
      toast.error(imageUploadMessage);
      setTimeout(() => {
        dispatch(resetImageUpload());
      }, 2000);
    }
  }, [imageUploadError, imageUploadSuccess, imageUploadMessage]);

  useEffect(() => {
    if (calculateInvestmentSuccess) {
      setInfoModal1(true);
      dispatch(resetCalculateInvestment());
    }
    if (calculateInvestmentError) {
      toast.error(calculateInvestmentMessage);
      dispatch(resetCalculateInvestment());
    }
  }, [
    calculateInvestmentSuccess,
    calculateInvestmentError,
    calculateInvestmentMessage,
  ]);

  useEffect(() => {
    if (singlePaymentSuccess) {
      toast.success("payment history fetched successfully");
      setTimeout(() => {
        dispatch(resetSinglePayment());
      }, 3000);
    }

    if (singlePaymentError) {
      toast.error(singlePaymentMessage);
      setTimeout(() => {
        dispatch(resetSinglePayment());
      }, 3000);
    }
  }, [
    singlePaymentLoading,
    singlePaymentSuccess,
    singlePaymentError,
    singlePaymentMessage,
  ]);

  // useEffect(() => {
  //   dispatch(resetPayment());
  // }, []);

  const investSpread = [1, 2, 3, 4, 5];

  return (
    <React.Fragment>
      {user ? (
        <div className="w-full h-full lg:flex gap-[60px] px-5 lg:px-[70px] mb-10 mt-10">
          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <UploadDocumentSection setIsOpen={setIsOpen} />
            </div>
          )}
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

            <div className="w-full lg:flex gap-6 h-max flex-wrap">
              {/* SAVINGS CARD STARTS HERE */}
              <div className="h-[185px] w-full lg:w-[285px] bg-white shadow-md shadow-black/30 pt-2 px-3 rounded-[5px]">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">Savings</p>
                  <img src={money} className="bg-[#FD6602] p-1" />
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest ">
                  {userDetails
                    ? "N" + formatNumber(userDetails?.userData?.savings)
                    : "N0.00"}
                </p>

                {/* BOTTOM CARD SECTION*/}

                <div className="flex items-center justify-between text-xs mt-14">
                  {userDetails?.userData?.savingsDueDate && (
                    <p className="w-[200px]">
                      Note: Next payment coming up{" "}
                      {formatDate(userDetails?.userData?.savingsDueDate)}
                    </p>
                  )}
                  <div
                    onClick={() => setSavingsModal(true)}
                    className="bg-black px-2 py-1 rounded-[5px] text-white text-center text-xs w-max"
                  >
                    pay now
                  </div>
                </div>
              </div>
              {/* SAVINGS CARD ENDS HERE */}

              {/* SHARE CAPITAL STARTS HERE */}
              <div className="h-[185px] w-full lg:w-[285px] bg-white shadow-md mt-9 lg:mt-0 shadow-black/30 pt-2 px-3 rounded-[5px]">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">Share Capital</p>
                  <img src={money} className="bg-[#FD6602] p-1" />
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest ">
                  {userDetails
                    ? "N" +
                      formatNumber(userDetails?.userData?.shareCapitalAmount)
                    : "N0.00"}
                </p>

                {/* BOTTOM CARD SECTION*/}

                <div className="flex items-center justify-between text-xs mt-14">
                  {userDetails?.userData?.shareCapitalStatus ===
                    "part-paid" && (
                    <div
                      onClick={() => setPartShareModal(true)}
                      className="bg-[#FD6602] px-2 py-1 rounded-[5px] text-white text-center text-xs w-max"
                    >
                      Continue Payment
                    </div>
                  )}
                </div>
              </div>
              {/* SHARE CAPITAL ENDS HERE */}

              <div className="h-[185px] w-full lg:w-[285px] bg-white shadow-md shadow-black/30 pt-2 px-3 rounded-[5px] mt-9 lg:mt-0">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50 capitalize">
                    Monthly Insurance Payment
                  </p>
                  <img src={target} className="bg-[#FD6602] p-1" />
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold flex flex-col gap-2 font-sans text-black text-2xl tracking-widest ">
                  {userDetails
                    ? "N" +
                      formatNumber(userDetails?.userData?.monthlyHousePayment)
                    : "N0.00"}
                  <span className="text-sm">
                    {userDetails
                      ? "Amount paid so far: N" +
                        formatNumber(userDetails?.userData?.monthlyPaymentSoFar)
                      : "N0.00"}
                  </span>
                </p>
                {userDetails?.userData?.dueDate && (
                  <div className="flex items-center justify-between text-xs mt-12">
                    <p className="w-[200px]">
                      Note: Next payment coming up{" "}
                      {formatDate(userDetails?.userData?.dueDate)}
                    </p>
                    <div
                      onClick={() => {
                        handleSelect("monthly");
                        setMonthlyModal(true);
                      }}
                      className="bg-black px-2 py-1 rounded-[5px] text-white text-center text-xs w-max"
                    >
                      pay now
                    </div>
                  </div>
                )}
              </div>

              <div className="h-[185px] w-full lg:w-[285px] bg-white shadow-md shadow-black/30 pt-2 px-3 rounded-[5px] mt-9 lg:mt-0">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">House Value</p>
                  <img src={target} className="bg-[#FD6602] p-1" />
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest ">
                  {userDetails
                    ? "N" + userDetails?.userData?.houseAmount
                    : "N0.00"}
                </p>
              </div>

              <div className="h-[185px] w-full lg:w-[285px] bg-white shadow-md shadow-black/30 pt-2 px-3 rounded-[5px] mt-9  lg:mt-0">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">Investment</p>
                  <img src={target} className="bg-[#FD6602] p-1" />
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest mt-1">
                  {userDetails
                    ? "N" +
                      formatNumber(userDetails?.userData?.investmentAmount)
                    : "N0.00"}
                </p>

                {/* BOTTOM CARD SECTION*/}
                <div className="flex items-center justify-between text-xs mt-12">
                  <div className="w-[200px]">
                    <p className="font-sans text-black text-sm tracking-widest">
                      ROI
                    </p>
                    <p className="font-bold font-sans text-black text-lg tracking-widest">
                      {userDetails ? "N" + userDetails?.userData?.roi : "N0.00"}
                    </p>
                  </div>

                  {userDetails?.userData?.roi ? (
                    <div
                      onClick={() => setWdrawal(true)}
                      className="bg-black px-2 py-1 cursor-pointer rounded-[5px] text-white text-center text-xs w-max"
                    >
                      Withdraw
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <h1 className="text-lg font-bold mt-10">Payment History</h1>
            <div className="w-full overflow-x-auto">
              <table className="mt-10 w-full table-auto">
                <thead className="w-full">
                  <tr className="text-black/50 font-extralight">
                    {/* <th className="text-left pb-2">Name</th> */}
                    <th className="text-left pb-2">Amount</th>
                    <th className="text-left pb-2">Date</th>
                    <th className="text-left pb-2">Status</th>
                    <th className="text-left pb-2">Ref</th>
                  </tr>
                </thead>

                <tbody>{display}</tbody>
              </table>
            </div>

            <div className="flex lg:items-end items-center justify-between w-full mt-[30px]">
              <div
                onClick={() => dispatch(getSinglePayment())}
                className="text-[#FD6602] flex items-center gap-4 w-full cursor-pointer"
              >
                <GrRefresh color="#FD6602" className="cursor-pointer" /> Refresh
                Payments
              </div>

              <div className="w-full flex flex-col items-end justify-center ">
                <p className="text-base text-[#FD6602] mt-[30px] mb-[7px] lg:mr-6">
                  showing {Math.ceil(firstIndex + itemsPerPage)} of{" "}
                  {singlePaymentHistory?.payments?.length} entries
                </p>

                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"containerStyles"}
                  previousLinkClassName={"previousPage"}
                  nextLinkClassName={"nextPage"}
                  activeLinkClassName={"activePage"}
                />
              </div>
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
              <div className="">
                {userDetails?.userData?.imageLink ? (
                  <img
                    src={userDetails?.userData?.imageLink}
                    alt="profile image"
                    className="w-[138px] h-[138px] rounded-full mt-10 object-cover mb-5"
                  />
                ) : (
                  <div className="flex flex-col items-center relative mb-2">
                    <div className="w-[138px] h-[138px] bg-[#eeeeee] rounded-full mt-10 mb-5 flex items-center justify-center text-center text-sm relative">
                      {file ? file.name : "Profile Image"}
                      <label
                        htmlFor="file"
                        className="bg-black absolute bottom-0 right-3 rounded-full"
                      >
                        <img
                          src={add}
                          className="w-5 h-5 bg-[#FD6602] cursor-pointer"
                        />
                      </label>
                    </div>

                    {file && (
                      <div
                        onClick={setImg}
                        className="w-max p-1 bg-[#FD6602] rounded-md text-white font-sans text-sm"
                      >
                        {imageUploadLoading ? "Processing..." : "Upload Image"}
                      </div>
                    )}

                    <input
                      type="file"
                      id="file"
                      onChange={(e) => {
                        const { files } = e.target;
                        setFile(files[0]);
                      }}
                      name="file"
                      className="hidden opacity-0 cursor-pointer p-2 appearance-none "
                    />
                  </div>
                )}
              </div>

              <h1 className="font-bold text-xl">
                {userDetails
                  ? userDetails?.userData?.name?.toUpperCase()
                  : "user's Name"}
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
                <div
                  onClick={() => dispatch(checkEligibility())}
                  className="bg-[rgb(253,102,2)] w-full h-[20px] py-[15px] px-[15px] rounded-[5px] flex items-center justify-center my-7 text-white  cursor-pointer"
                >
                  {loanEligibleLoading ? "Processing..." : "Get a loan"}
                </div>
                <div
                  onClick={() => setPayModal(true)}
                  className="bg-[#000] w-full h-[20px] py-[15px] px-[5px] rounded-[5px] flex items-center justify-center my-7 text-white text-sm  cursor-pointer"
                >
                  Pay
                </div>
              </div>
              <div
                onClick={() => {
                  setIsOpen(true);
                }}
                className="bg-[rgb(253,102,2)] w-full h-[20px] py-[15px] px-[15px] rounded-[5px] flex items-center justify-center my-7 text-white cursor-pointer"
              >
                Upload documents
              </div>
              {/* PROFILE SECTION ENDS HERE*/}

              {/* ONLINE STORE DISPLAY STARTS HERE */}
              <div className="lg:w-[280px] w-full h-[231px] bg-no-repeat bg-center shop-banner object-cover rounded-[10px] mb-20 px-5">
                <div className="w-[92px] h-[24px] bg-white rounded-[10px] mt-4 flex items-center justify-center">
                  <a
                    href="https://www.calgint.com/"
                    className="text-xs text-center"
                  >
                    Shop Online
                  </a>
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
                <p className="text-white/70 font-bold mt-3 text-sm">John Doe</p>
              </div>
              {/* CARD DISPLAY ENDS HERE */}
            </div>
          </div>

          {payModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-9 font-sans items-center lg:p-8 p-4 rounded-lg h-[50%] w-[550px] relative ">
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

                  <p className="font-semibold text-3xl text-center">N100,000</p>
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

          {partShareModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-14 font-sans items-center lg:p-8 p-4 rounded-lg h-[35%] w-[500px] relative ">
                <div
                  onClick={() => setPartShareModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <div className="w-full h-max flex flex-col items-center justify-center gap-7">
                  <h1 className="text-[#FD6602] text-2xl font-sans font-semibold">
                    Continue Share Capital Payment
                  </h1>
                  <p className="font-sans font-semibold text-xl">
                    N{" "}
                    {formatNumber(
                      userDetails && userDetails?.userData?.shareCapitalLeft
                    )}
                  </p>
                </div>

                <div
                  onClick={handlePayment}
                  className="w-max p-3 rounded-md px-[30px] bg-[#FD6602] text-white font-bold font-sans "
                >
                  {paymentLoading ? "Processing" : "Continue"}
                </div>
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

                <div className="w-full h-[70%] overflow-y-auto flex flex-col gap-2">
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

                <div
                  onClick={() => navigate("/property")}
                  className="w-max p-3 cursor-pointer rounded-md px-[30px] bg-[#FD6602] text-white font-bold font-sans "
                >
                  View Properties
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
              <div className="bg-white flex flex-col gap-14 font-sans items-center lg:p-8 p-4 rounded-lg h-max w-[500px] relative ">
                <div
                  onClick={() => setInfoModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[40px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
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

                <p className="text-sm font-bold my-3">
                  Due to the Payment Gateway's limit of #500,000 per
                  transaction, all transactions above that amount will need to
                  be paid in parts of #490,000 over a period of time.(You can
                  continue making payments the next day. Thank you).
                </p>
              </div>
            </div>
          )}

          {infoModal1 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-20 font-sans items-center lg:p-8 p-4 rounded-lg h-[40%] w-[500px] relative ">
                <div
                  onClick={() => setInfoModal1(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-black/50 ">Annual Return</p>
                    <h1 className="text-xl">
                      {formatNumber(investmentData?.annualReturn)}
                    </h1>
                  </div>
                  {/* <div>
                    <p className="text-black/50 ">Duration</p>
                    <h1 className="text-xl">
                      {investmentData.investSpread > 1
                        ? investmentData.investSpread + " Years"
                        : investmentData.investSpread + " year"}
                    </h1>
                  </div> */}
                </div>

                <div className="w-full flex items-center justify-between">
                  {/* <div>
                    <p className="text-black/50 ">Monthly ROI</p>
                    <h1 className="text-xl">
                      {investmentData &&
                        "N" + formatNumber(investmentData.monthlyRoi)}
                    </h1>
                  </div> */}

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
          {calculateInvestmentLoading && (
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
          {noImg && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-16 font-sans items-center lg:p-8 p-4 rounded-lg h-[40%] w-[500px] relative ">
                <div
                  onClick={() => setNoImg(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>
                <h1 className="text-2xl font-semibold font-sans text-[rgb(253,102,2)]">
                  Please upload your profile image.
                </h1>

                <p className="text-center text-lg">
                  Your Profile Image is required to Validate your payments and
                  identity
                </p>
              </div>
            </div>
          )}

          {wdrawal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-16 font-sans items-center lg:p-8 p-4 rounded-lg h-[40%] w-[500px] relative ">
                <div
                  onClick={() => setWdrawal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>
                <h1 className="text-2xl font-semibold font-sans text-[rgb(253,102,2)]">
                  Withdrawal Update
                </h1>

                <p className="text-center text-lg">
                  You will be able to withdraw at the end of our investment year
                </p>
              </div>
            </div>
          )}

          {investModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-20 font-sans items-center lg:p-8 p-4 rounded-lg h-[30%] w-[500px] relative ">
                <div
                  onClick={() => setInvestModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <div className="w-full h-full overflow-y-auto flex flex-col gap-7">
                  <Input
                    label={"Investment Amount"}
                    placeholder={"e.g 1000000"}
                    name={"amount"}
                    value={investBody.amount}
                    type={"number"}
                    onChange={(e) =>
                      setInvestBody({
                        ...investBody,
                        amount: e.target.value,
                      })
                    }
                  />

                  <div
                    onClick={nextStepInvest}
                    className="w-max p-3 rounded-md px-[30px] bg-[#FD6602] place-self-center text-white font-bold font-sans "
                  >
                    Continue
                  </div>
                </div>
              </div>
            </div>
          )}

          {investModal1 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-20 font-sans items-center lg:p-8 p-4 rounded-lg h-[50%] w-[500px] relative ">
                <div
                  onClick={() => setInvestModal1(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {investSpread.map((item, index) => (
                    <p
                      onClick={() =>
                        setInvestBody({
                          ...investBody,
                          spread: item,
                        })
                      }
                      className={`p-2 w-full text-center ${
                        investBody.spread === item && "bg-[#FD6602] text-white"
                      } font-sans hover:bg-[#fd66029e] hover:text-white`}
                      key={index}
                    >
                      {item} {item < 2 ? "Year" : "Years"}
                    </p>
                  ))}

                  <div
                    onClick={getinvetsment}
                    className="w-max p-3 rounded-md px-[30px] bg-[#FD6602] place-self-center text-white font-bold font-sans "
                  >
                    Continue
                  </div>
                </div>
              </div>
            </div>
          )}

          {savingsModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-20 font-sans items-center lg:p-8 p-4 rounded-lg h-[30%] w-[500px] relative ">
                <div
                  onClick={() => setSavingsModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <div className="w-full h-full overflow-y-auto flex flex-col gap-7">
                  <Input
                    label={"Savings Amount"}
                    placeholder={"e.g 1000000"}
                    name={"amount"}
                    value={savingsBody.amount}
                    type={"number"}
                    onChange={(e) =>
                      setSavingsBody({
                        ...savingsBody,
                        amount: e.target.value,
                      })
                    }
                  />

                  <div
                    onClick={() => {
                      console.log("wetin dey sup");
                      handleSelect("savings");
                      handlePayment();
                    }}
                    className="w-max p-3 rounded-md px-[30px] bg-[#FD6602] place-self-center text-white font-bold font-sans "
                  >
                    Continue
                  </div>
                </div>
              </div>
            </div>
          )}

          {monthlyModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white flex flex-col gap-28 font-sans items-center lg:p-8 p-4 rounded-lg h-[40%] w-[250px] relative ">
                <div
                  onClick={() => setMonthlyModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-sm font-bold">X</h1>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <p className="text-center font-medium font-sans">
                    Monthly House Payment
                  </p>

                  <p className="font-semibold text-3xl text-center">
                    N{formatNumber(userDetails?.userData?.monthlyHousePayment)}
                  </p>
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
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </React.Fragment>
  );
};

export default Dashboard;
