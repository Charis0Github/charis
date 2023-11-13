import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingWithdrawal } from "../../Redux/Features/pendingWithdrawal";
import {
  approveWithdrawal,
  getApprovedWithdrawal,
  resetApprovedWithdrawal,
} from "../../Redux/Features/approvedWithdrawal";
import { ToastContainer, toast } from "react-toastify";
import load from "../../assets/loading.json";
import Lottie from "lottie-react";

const RequestView = () => {
  const { pendingWithdrawal } = useSelector((state) => state.pendingWithdrawal);
  const [prompt, setPrompt] = useState(false);
  const [selectedpayee, setSelectedPayee] = useState(null);
  const {
    approvedWithdrawalSuccess,
    approvedWithdrawalMessage,
    approvedWithdrawalError,
    approvingWithdrawalLoading,
  } = useSelector((state) => state.approvedWithdrawal);

  const dispatch = useDispatch();

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  const disclaimer = (item) => {
    setSelectedPayee(item);
    setPrompt(true);
  };

  useEffect(() => {
    if (approvedWithdrawalSuccess) {
      dispatch(getPendingWithdrawal());
      dispatch(getApprovedWithdrawal());
      toast.success(approvedWithdrawalMessage);
      setTimeout(() => {
        dispatch(resetApprovedWithdrawal());
      }, 1500);
    }
    if (approvedWithdrawalError) {
      toast.error(approvedWithdrawalMessage);
      setTimeout(() => {
        dispatch(resetApprovedWithdrawal());
      }, 1500);
    }
  }, [
    approvedWithdrawalSuccess,
    approvedWithdrawalMessage,
    approvedWithdrawalError,
  ]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="mt-10 w-full table-auto">
        <thead>
          <tr className="text-black/50 font-extralight">
            <th className="text-left pb-2 w-[300px]">Name</th>
            <th className="text-left pb-2 w-[300px]">Amount</th>
            <th className="text-left pb-2 w-[300px]">Date</th>
            <th className="text-left pb-2 w-[300px]">Action</th>
          </tr>
        </thead>

        <tbody>
          {pendingWithdrawal &&
            pendingWithdrawal?.pending.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="text-clip pr-3 pb-4">{item.name}</td>
                  <td className=" pr-3 pb-4">{item.amount}</td>
                  <td className=" pr-3 pb-4">{formatDate(item.createdAt)}</td>
                  <td className=" pr-3 pb-4">
                    <div
                      onClick={() => disclaimer(item)}
                      className="w-[143px] h-[42px] cursor-pointer bg-black rounded-md text-white flex items-center justify-center"
                    >
                      Make Payment
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {prompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white flex flex-col gap-14 font-sans items-center lg:p-8 p-4 rounded-lg h-max w-[500px] relative ">
            <div
              onClick={() => setPrompt(false)}
              className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[40px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
            >
              <h1 className="text-sm font-bold">X</h1>
            </div>

            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-black/50 ">Account Name</p>
                <h1 className="text-xl">
                  {selectedpayee && selectedpayee.name}
                </h1>
              </div>
              <div>
                <p className="text-black/50 ">Account Number</p>
                <h1 className="text-xl">
                  {selectedpayee && selectedpayee.accountNumber}
                </h1>
              </div>
            </div>

            <div className="w-full flex items-center justify-between">
              <div>
                <p className="text-black/50 ">Bank Account</p>
                <h1 className="text-xl">
                  {selectedpayee && selectedpayee.bank}
                </h1>
              </div>

              <div>
                <p className="text-black/50 ">Amount</p>
                <h1 className="text-xl">
                  {selectedpayee && selectedpayee.amount}
                </h1>
              </div>
            </div>

            <div
              onClick={() => {
                setPrompt(false);
                dispatch(approveWithdrawal(selectedpayee._id));
              }}
              className="w-max p-3 rounded-md px-[30px] bg-[#FD6602] text-white font-bold font-sans "
            >
              Done
            </div>

            <p className="text-sm font-bold my-3">
              Only click 'DONE' when payment has been made
            </p>
          </div>
        </div>
      )}

      {approvingWithdrawalLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
          <div className="bg-transparent lg:p-8 p-4 rounded-lg h-max w-[300px] relative overflow-y-auto">
            <Lottie animationData={load} width={200} height={200} loop={true} />
          </div>
        </div>
      )}
    </div>
  );
};

const HistoryView = () => {
  const { approvedWithdrawal } = useSelector(
    (state) => state.approvedWithdrawal
  );

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="mt-10 w-full table-auto">
        <thead>
          <tr className="text-black/50 font-extralight">
            <th className="text-left pb-2 w-[300px]">Name</th>
            <th className="text-left pb-2 w-[300px]">Amount</th>
            <th className="text-left pb-2 w-[300px]">Date</th>
            <th className="text-left pb-2 w-[300px]">Status</th>
          </tr>
        </thead>

        <tbody>
          {approvedWithdrawal &&
            approvedWithdrawal?.withdrawals.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="text-clip pr-3 pb-4">{item.name}</td>
                  <td className=" pr-3 pb-4">{item.amount}</td>
                  <td className=" pr-3 pb-4">{formatDate(item.createdAt)}</td>
                  <td className=" pr-3 pb-4">
                    <p className="w-max px-4 py-1 bg-[#60D66980] rounded-md text-black">
                      Successful
                    </p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const Affiliates = () => {
  const [view, setView] = useState("request");
  const dispatch = useDispatch();

  const renderPage = () => {
    switch (view) {
      case "request":
        return <RequestView />;
      case "history":
        return <HistoryView />;
      default:
        return <div> EMPTY MAHN</div>;
    }
  };

  useEffect(() => {
    dispatch(getPendingWithdrawal());
    dispatch(getApprovedWithdrawal());
  }, []);

  return (
    <div className="flex flex-col w-full px-10 h-screen py-8 overflow-y-auto">
      <ToastContainer position="top-center" hideProgressBar />
      <div className="w-full flex items-center gap-8">
        <p
          className={`${
            view === "request"
              ? "font-semibold border-b-2 border-[#FD6602] cursor-pointer"
              : "font-normal cursor-pointer"
          }`}
          onClick={() => setView("request")}
        >
          Requests
        </p>
        <p
          className={`${
            view === "history"
              ? "font-semibold border-b-2 border-[#FD6602] cursor-pointer"
              : "font-normal cursor-pointer"
          }`}
          onClick={() => setView("history")}
        >
          History
        </p>
      </div>
      <div className="w-full h-full">{renderPage()}</div>
    </div>
  );
};

export default Affiliates;
