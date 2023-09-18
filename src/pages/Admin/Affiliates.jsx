import React, { useState } from "react";

const requestView = () => {
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
          <tr>
            <td className="text-clip pr-3 pb-4">Umoru Emmanuel okorie</td>
            <td className=" pr-3 pb-4">N100,000 </td>
            <td className=" pr-3 pb-4">03, Jun 2023</td>
            <td className=" pr-3 pb-4">
              <div className="w-[143px] h-[42px] bg-black rounded-md text-white flex items-center justify-center">
                Make Payment
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-clip pr-3 pb-4">Umoru Emmanuel okorie</td>
            <td className=" pr-3 pb-4">N100,000 </td>
            <td className=" pr-3 pb-4">03, Jun 2023</td>
            <td className=" pr-3 pb-4">
              <div className="w-[143px] h-[42px] bg-black rounded-md text-white flex items-center justify-center">
                Make Payment
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const historyView = () => {
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
          <tr>
            <td className="text-clip pr-3 pb-4">Umoru Emmanuel okorie</td>
            <td className=" pr-3 pb-4">N100,000 </td>
            <td className=" pr-3 pb-4">03, Jun 2023</td>
            <td className=" pr-3 pb-4">
              <p className="w-max px-4 py-1 bg-[#60D66980] rounded-md text-black">
                Successful
              </p>
            </td>
          </tr>
          <tr>
            <td className="text-clip pr-3 pb-4">Umoru Emmanuel okorie</td>
            <td className=" pr-3 pb-4">N100,000 </td>
            <td className=" pr-3 pb-4">03, Jun 2023</td>
            <td className=" pr-3 pb-4">
              <p className="w-max px-4 py-1 bg-[#60D66980] rounded-md text-black">
                Successful
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Affiliates = () => {
  const [view, setView] = useState("request");
  return (
    <div className="flex flex-col w-full px-10 h-screen py-8 overflow-y-auto">
      <div className="w-full flex items-center gap-8">
        <p
          className={`${
            view === "request"
              ? "font-semibold border-b-2 border-[#FD6602]"
              : "font-normal"
          }`}
          onClick={() => setView("request")}
        >
          Requests
        </p>
        <p
          className={`${
            view === "history"
              ? "font-semibold border-b-2 border-[#FD6602]"
              : "font-normal"
          }`}
          onClick={() => setView("history")}
        >
          History
        </p>
      </div>
      <div className="w-full h-full">
        {view === "request" ? requestView() : historyView()}
      </div>
    </div>
  );
};

export default Affiliates;
