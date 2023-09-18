import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import dp from "../../assets/dp.png";
import money from "../../assets/money.svg";
import target from "../../assets/target.svg";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  resetWithdrawal,
  withdrawalDetailsUpdate,
} from "../../Redux/Features/WithdrawalDetailsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserDetails } from "../../Redux/Features/authSlice";
import {
  requestPayment,
  resetRequestPay,
} from "../../Redux/Features/requestFundSlice";

const AffiliateDashboard = () => {
  const [modal, setModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [formDeets, setFormDeets] = useState({
    accountNumber: "",
    bank: "",
  });
  const [amount, setAmount] = useState("");
  const { user, userDetails } = useSelector((state) => state.auth);
  const {
    withdrawalDeetsLoading,
    withdrawalDeetsSuccess,
    withdrawalDeetsError,
    withdrawalDeetsMessage,
  } = useSelector((state) => state.paymentDetails);
  const {
    requestPayLoading,
    requestPaySuccess,
    requestPayError,
    requestPayMessage,
  } = useSelector((state) => state.withdrawal);
  const { accountNumber, bank } = formDeets;
  const dispatch = useDispatch();

  const copyLink = () => {
    navigator.clipboard.writeText(
      "http://localhost:5173/referralLogin/" + userDetails.userData.myRefCode
    );
  };

  const updateDetails = () => {
    if (accountNumber && bank) {
      const reqBody = {
        accountNumber,
        bank,
      };
      dispatch(withdrawalDetailsUpdate(reqBody));
    }
  };

  const request = () => {
    if (amount) {
      const formBody = {
        amount,
      };
      dispatch(requestPayment(formBody));
    }
  };

  useEffect(() => {
    if (withdrawalDeetsSuccess) {
      toast.success("Details updated successfully");
      dispatch(getUserDetails());
      setModal(false);
      setTimeout(() => {
        dispatch(resetWithdrawal());
      }, 3000);
    }

    if (withdrawalDeetsError) {
      toast.error(withdrawalDeetsMessage);
      setModal(false);
      setTimeout(() => {
        dispatch(resetWithdrawal());
      }, 3000);
    }

    if (requestPaySuccess) {
      toast.success("Request made successfully");
      dispatch(resetRequestPay());
      setWithdrawModal(false);
      setTimeout(() => {
        dispatch(resetRequestPay());
      }, 3000);
    }
    if (requestPayError) {
      toast.error(requestPayMessage);
      dispatch(resetRequestPay());
      setWithdrawModal(false);
      setTimeout(() => {
        dispatch(resetRequestPay());
      }, 3000);
    }
  }, [
    withdrawalDeetsError,
    withdrawalDeetsSuccess,
    withdrawalDeetsMessage,
    requestPaySuccess,
    requestPayError,
    requestPayMessage,
  ]);

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ToastContainer position="top-center" hideProgressBar />
      {user ? (
        <div className="w-full h-full lg:flex gap-[60px] lg:items-start lg:justify-start px-5 lg:px-[70px] mb-10 mt-10">
          {/* LEFT SECTION STARTS HERE */}
          <div className="lg:flex-1 w-full h-full">
            <h1 className="text-3xl text-[#FF6700] font-sans">Dashboard</h1>

            {/* TOP LAYER */}
            <div className="w-full lg:flex gap-8 h-max mt-3">
              <div className="h-[160px] w-full  bg-[#F5F5F5] shadow-md shadow-black/30 pt-2 px-3 rounded-[5px]">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">Balance</p>
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest mt-8">
                  N{userDetails ? userDetails?.userData?.balance : "balance"}
                </p>
              </div>

              <div className="h-[160px] w-full  bg-[#F5F5F5] shadow-md shadow-black/30 pt-2 px-3 rounded-[5px] mt-9 lg:mt-0">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">Unpaid Referrals</p>
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest mt-8">
                  N
                  {userDetails
                    ? userDetails?.userData?.unpaidRefs
                    : "unpaidRefs"}
                </p>
              </div>

              <div className="h-[160px] w-full  bg-[#F5F5F5] shadow-md shadow-black/30 pt-2 px-3 rounded-[5px] mt-9 lg:mt-0">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">Paid Referrals</p>
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest mt-8">
                  N{userDetails ? userDetails?.userData?.paidRefs : "paidRefs"}
                </p>
              </div>

              <div className="h-[160px] w-full  bg-[#F5F5F5] shadow-md shadow-black/30 pt-2 px-3 rounded-[5px] mt-9 lg:mt-0">
                {/* TOP CARD SECTION */}
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-black/50">Withdrawn</p>
                </div>

                {/* MIDDLE CARD SECTION*/}
                <p className="font-bold font-sans text-black text-2xl tracking-widest mt-8">
                  N
                  {userDetails ? userDetails?.userData?.withdrawn : "Withdrawn"}
                </p>
              </div>
            </div>

            {/* MIDDLE LAYER */}
            <div className="w-full flex items-center justify-between h-max mt-20">
              <h1>Withdrawal Status</h1>
              <button
                onClick={() => setWithdrawModal(true)}
                className="bg-black py-2 px-10 w-max text-white rounded-md"
              >
                Request Funds
              </button>
            </div>

            {/* TABLE LAYER */}
            <div className="w-full overflow-x-auto">
              <table className="mt-10 w-full table-auto border-collapse">
                <thead>
                  <tr className="text-black/50 font-extralight ">
                    <th className="text-left pb-2 w-1/2 ">Amount</th>
                    <th className="text-left pb-2 w-1/2">Date</th>
                    <th className="text-left pb-2 w-1/2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="pb-4 ">N200,000,000</td>
                    <td className="pb-4 ">01/08/2023</td>
                    <td className="pb-4 ">
                      <p className="bg-green-400 text-black py-1 px-6 w-max rounded-md">
                        Successful
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-4 ">N20,000</td>
                    <td className="pb-4 ">01/08/2023</td>
                    <td className="pb-4 ">
                      <p className="bg-red-400 text-black py-1 px-6 w-max rounded-md">
                        Declined
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-4 ">N20,000</td>
                    <td className="pb-4 ">01/08/2023</td>
                    <td className="pb-4 ">
                      <p className="bg-yellow-300 text-black py-1 px-6 w-max rounded-md">
                        Pending
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-4 ">N20,000</td>
                    <td className="pb-4 ">01/08/2023</td>
                    <td className="pb-4 ">
                      <p className="bg-green-400 text-black py-1 px-6 w-max rounded-md">
                        Successful
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* LEFT SECTION ENDS HERE */}

          {/* RIGHT SECTION STARTS HERE */}
          <div className="lg:w-[330px] w-full h-full mt-10 lg:mt-0">
            {/* NAVIGATION BUTTON */}
            <div
              onClick={() => navigate("/")}
              className="w-full h-[32px] flex bg-black items-center justify-center gap-5 rounded-[5px] cursor-pointer"
            >
              <h1 className="text-white">Go to website</h1>
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

            <div className="flex flex-col w-full min-h-screen items-center justify-between lg:px-[40px] px-5 mt-5 bg-[#F5F5F5] shadow-md shadow-black/30">
              {/* PROFILE SECTION STARTS HERE */}
              <div className="flex flex-col w-full items-center justify-center">
                <div className="w-[130px] h-[130px] rounded-full mt-10 mb-3 flex items-center justify-center bg-black text-white text-2xl">
                  {userDetails
                    ? userDetails?.userData?.name.charAt(0).toUpperCase()
                    : "initial"}
                </div>

                <h1 className="font-bold text-xl">
                  {userDetails
                    ? userDetails?.userData?.affiliateUserName
                    : "Username"}
                </h1>

                <p className="text-black/70 mt-2">
                  {userDetails ? userDetails?.userData?.email : "Email"}
                </p>
                <p className="text-black/70">
                  {userDetails
                    ? userDetails?.userData?.phoneNumber
                    : "Phone Number"}
                </p>

                <div
                  onClick={copyLink}
                  className="bg-[rgb(253,102,2)] h-[18px] py-[15px] px-[25px] rounded-[5px] flex items-center justify-center my-7 text-white"
                >
                  Copy Referral Link
                </div>
              </div>
              {/* PROFILE SECTION ENDS HERE*/}

              {/* PAYMENT DEETS SECTION STARTS HERE */}

              <div className="flex flex-col w-full h-max items-start justify-start ">
                <h1 className="font-bold text-lg">Payment Details</h1>

                <div className="flex items-center gap-7">
                  <p className="text-black/70 mt-2">Account Number:</p>
                  <p className="text-black/70 mt-2">
                    {" "}
                    {userDetails && userDetails?.userData?.accountNumber}
                  </p>
                </div>

                <div className="flex items-center gap-28">
                  <p className="text-black/70 mt-2">Bank: </p>
                  <p className="text-black/70 mt-2">
                    {userDetails && userDetails?.userData?.bank}
                  </p>
                </div>

                <div
                  onClick={() => setModal(true)}
                  className="bg-[rgb(253,102,2)] h-[18px] py-[20px] px-[25px] rounded-[5px] lg:place-self-center flex items-center justify-center my-7 text-white"
                >
                  Edit Details
                </div>
              </div>
              {/* PAYMENT DEETS SECTION ENDS HERE */}
            </div>
          </div>
          {/* RIGHT SECTION ENDS HERE */}

          {/* MODAL BEGINS HERE */}
          {modal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white lg:p-8 p-4 lg:px-20 rounded-lg h-max w-[500px] relative">
                <h1 className="text-black font-sans font-bold mb-10">
                  Payment Details
                </h1>
                <div className="flex flex-col w-full gap-2 mb-8">
                  <Input
                    type={"text"}
                    name={"accountNumber"}
                    placeholder={"Input Account Number"}
                    label={"Account Number "}
                    value={accountNumber}
                    onChange={(e) =>
                      setFormDeets({
                        ...formDeets,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                  <p className="text-[#FD6602] font-sans">John Doe Emmanuel</p>
                </div>

                <Input
                  type={"text"}
                  name={"bank"}
                  placeholder={""}
                  label={"Bank Name"}
                  value={bank}
                  onChange={(e) =>
                    setFormDeets({
                      ...formDeets,
                      bank: e.target.value,
                    })
                  }
                />

                <button
                  onClick={updateDetails}
                  className="bg-black h-[18px] py-[20px] px-[25px] rounded-[5px] lg:place-self-center flex items-center justify-center w-[80%] my-7 text-white"
                >
                  {withdrawalDeetsLoading ? "Processing" : "Update"}
                </button>

                <div
                  onClick={() => setModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:right-[-10px] -right-3 h-[20px] w-[20px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-xs font-bold">X</h1>
                </div>
              </div>
            </div>
          )}

          {withdrawModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
              <div className="bg-white lg:p-8 p-4 lg:px-20 rounded-lg h-max w-[500px] relative">
                <h1 className="text-black font-sans font-bold mb-10">
                  Request Funds
                </h1>
                <Input
                  type="number"
                  name="amount"
                  placeholder={"e.g: 5000"}
                  onChange={(e) => setAmount(e.target.value)}
                  label="Amount"
                />

                <button
                  onClick={request}
                  className="bg-black h-[18px] py-[20px] px-[25px] rounded-[5px] lg:place-self-center flex items-center justify-center w-[80%] my-7 text-white"
                >
                  {requestPayLoading ? "processing" : "Confirm"}
                </button>

                <div
                  onClick={() => setWithdrawModal(false)}
                  className="absolute -top-3 flex items-center justify-center lg:right-[-10px] -right-3 h-[20px] w-[20px] rounded-full p-1 bg-black text-white cursor-pointer"
                >
                  <h1 className="text-xs font-bold">X</h1>
                </div>
              </div>
            </div>
          )}

          {/* MODAL ENDS HERE */}
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </React.Fragment>
  );
};

export default AffiliateDashboard;
