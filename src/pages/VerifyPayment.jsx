import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPayment, verifyPayment } from "../Redux/Features/paymentSlice";
import { useParams, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import verify from "../assets/verify.json";
import success from "../assets/success.svg";
import failed from "../assets/failed.svg";
import { getUserDetails } from "../Redux/Features/authSlice";
import {
  corporativeRegister,
  resetCorporativeRegister,
  resetFormData,
} from "../Redux/Features/formSlice";
import { toast } from "react-toastify";
import { getSinglePayment } from "../Redux/Features/SinglePaymentHistorySlice";

const VerifyPayment = () => {
  const [status, setStatus] = useState("");
  const [txRef, setTxRef] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const dispatch = useDispatch();
  const {
    paymentStatus,
    verifyStatus,
    verifyLoading,
    verifySuccess,
    verifyError,
    verifyMessage,
  } = useSelector((state) => state.payment);

  const {
    title,
    nationality,
    address,
    gender,
    dob,
    lga,
    profession,
    officeAddress,
    statusRank,
    monthlyIncome,
    yearsOfService,
    retirementAge,
    educationalQualification,
    nextOfKinName,
    nextOfKinAddress,
    relationship,
    nextOfKinPhoneNumber,
    nextOfKinEmail,
    houseSize,
    houseType,
    preferredLocation,
    paymentPlan,

    corporativeLoading,
    corporativeSuccess,
    corporativeError,
    corporativeMessage,
  } = useSelector((state) => state.formData);

  const navigate = useNavigate();

  const backHandle = () => {
    dispatch(resetPayment());
    dispatch(resetFormData());
    dispatch(resetCorporativeRegister());
    if (paymentStatus.tag === "reg") {
      navigate("/");
    }
    if (paymentStatus.tag === "house") {
      navigate("/dashboard");
    }
    if (paymentStatus.tag === "share") {
      navigate("/dashboard");
    }
    if (paymentStatus.tag === "savings") {
      navigate("/dashboard");
    }
    if (paymentStatus.tag === "invest") {
      navigate("/dashboard");
    }
    if (paymentStatus.tag === "monthly") {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;
    // Create a URLSearchParams object to parse the query parameters
    const urlParams = new URLSearchParams(currentUrl);
    // Get the values of the query parameters
    const txRef = urlParams.get("tx_ref");
    const annualReturn = urlParams.get("annualReturn");
    const monthlyRoi = urlParams.get("monthlyRoi");
    const investSpread = urlParams.get("investSpread");
    const transactionId = urlParams.get("transaction_id");

    const paramKeys = urlParams.getAll("");
    const paramHas = urlParams.has("tx_ref");

    console.log("Keys ;" + paramKeys, "Has" + paramHas);
    setStatus(paramKeys);
    setTxRef(txRef);
    setTransactionID(transactionId);
    const reqBody = {
      transactionId: txRef,
      tag: paymentStatus.tag,
    };
    dispatch(verifyPayment(reqBody));

    // return () => {
    //   dispatch(resetPayment());
    //   dispatch(resetFormData());
    //   dispatch(resetCorporativeRegister());
    // };
  }, []);

  const retry = () => {
    const data = {
      title,
      nationality,
      address,
      gender,
      dob,
      lga,
      profession,
      officeAddress,
      statusRank,
      monthlyIncome,
      yearsOfService,
      retirementAge,
      educationalQualification,
      nextOfKinName,
      nextOfKinAddress,
      relationship,
      nextOfKinPhoneNumber,
      nextOfKinEmail,
      houseSize,
      houseType,
      preferredLocation,
      paymentPlan,
    };
    dispatch(corporativeRegister(data));
  };

  useEffect(() => {
    if (verifySuccess) {
      if (paymentStatus.tag === "reg") {
        const data = {
          title,
          nationality,
          address,
          gender,
          dob,
          lga,
          profession,
          officeAddress,
          statusRank,
          monthlyIncome,
          yearsOfService,
          retirementAge,
          educationalQualification,
          nextOfKinName,
          nextOfKinAddress,
          relationship,
          nextOfKinPhoneNumber,
          nextOfKinEmail,
          houseSize,
          houseType,
          preferredLocation,
          paymentPlan,
        };
        dispatch(corporativeRegister(data));
      } else {
        dispatch(getSinglePayment());
        dispatch(getUserDetails());
      }
    }

    if (verifyError) {
      console.log("payment status Failed");
    }
  }, [verifySuccess, verifyError]);

  useEffect(() => {
    if (corporativeSuccess) {
      dispatch(getUserDetails());
    }

    if (corporativeError) {
      toast.error(corporativeMessage);
    }
  }, [corporativeSuccess, corporativeError]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {verifyLoading && (
        <div className="w-full h-full lg:w-[45%] lg:h-[45%] bg-white flex items-center justify-center">
          <Lottie
            animationData={verify}
            width={50}
            height={50}
            loop={true}
            className="object-contain"
          />
        </div>
      )}

      {verifySuccess && (
        <div className="lg:w-[45%] lg:h-[55%] w-full h-full bg-white shadow-md shadow-black/50 rounded-md flex flex-col items-center justify-center p-5 lg:p-10">
          <img
            src={success}
            width={100}
            height={100}
            className="object-contain"
          />
          <div className="flex flex-col items-center justify-center my-5 w-full">
            <h1 className="text-xl text-center font-sans font-bold">
              Payment Received
            </h1>
            <p>
              We received your payment of{" "}
              {verifyStatus && verifyStatus.record.amount}
            </p>
          </div>

          <div className="w-full h-[2px] bg-black/50 my-2"></div>

          <div className="w-full flex flex-col gap-2 lg:px-14">
            <div className="flex items-center justify-between">
              <p>Payment Amount:</p>
              <p>{verifyStatus.record.amount}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Payment Date:</p>
              <p>{verifyStatus.record.amount}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Payment Method:</p>
              <p>Flutterwave</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Confirmation:</p>
              <p>Successful</p>
            </div>

            {corporativeLoading ? (
              <div className="w-full p-4 bg-[#FD6602] rounded-md text-white text-center font-sans font-semibold mt-4">
                <p>Please wait while we process your registration</p>
              </div>
            ) : corporativeError ? (
              <div className="w-full p-4 bg-[#FD6602] rounded-md text-white text-center font-sans font-semibold mt-4">
                <p onClick={retry}>Registration failed....Click to retry</p>
              </div>
            ) : (
              <div className="w-full p-4 bg-[#FD6602] rounded-md text-white text-center font-sans font-semibold mt-4">
                <p onClick={backHandle}>Payment Complete....Back to Site</p>
              </div>
            )}

            {/* <div className="w-full p-4 bg-[#FD6602] rounded-md text-white text-center font-sans font-semibold mt-4">
              <p onClick={backHandle}>Payment Complete....Back to Site</p>
            </div> */}
          </div>
        </div>
      )}

      {verifyMessage === "R" && (
        <div className="lg:w-[45%] lg:h-[55%] w-full h-full bg-white shadow-md shadow-black/50 rounded-md flex flex-col items-center justify-center p-5 lg:p-10">
          <img
            src={failed}
            width={100}
            height={100}
            className="object-contain"
          />

          <div className="flex flex-col items-center justify-center my-5 w-full">
            <h1 className="text-xl text-center font-sans font-bold">
              Payment Failed
            </h1>
            <p>Your payment has failed</p>
          </div>

          <div className="w-full p-4 bg-[#FD6602] cursor-pointer rounded-md text-white text-center font-sans font-semibold mt-4">
            <p onClick={backHandle}>Back to Site</p>
          </div>
        </div>
      )}
      {verifyMessage === "p" && (
        <div className="lg:w-[45%] lg:h-[55%] w-full h-full bg-white shadow-md shadow-black/50 rounded-md flex flex-col items-center justify-center p-5 lg:p-10">
          <img
            src={failed}
            width={100}
            height={100}
            className="object-contain"
          />

          <div className="flex flex-col items-center justify-center my-5 w-full">
            <h1 className="text-xl text-center font-sans font-bold">
              Payment Failed
            </h1>
            <p>Your payment has failed</p>
          </div>

          <div className="w-full p-4 bg-[#FD6602] rounded-md text-white text-center font-sans font-semibold mt-4">
            <p onClick={backHandle}>Back to Site</p>
          </div>
        </div>
      )}

      {verifyMessage === "U" && (
        <div className="lg:w-[45%] lg:h-[55%] w-full h-full bg-white shadow-md shadow-black/50 rounded-md flex flex-col items-center justify-center p-5 lg:p-10">
          <img
            src={failed}
            width={100}
            height={100}
            className="object-contain"
          />

          <div className="flex flex-col items-center justify-center my-5 w-full">
            <h1 className="text-xl text-center font-sans font-bold">
              Payment Failed
            </h1>
            <p>User has already Paid</p>
          </div>

          <div className="w-full p-4 bg-[#FD6602] rounded-md text-white text-center font-sans font-semibold mt-4">
            <p onClick={backHandle}>Back to Site</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;
