import React, { useState } from "react";
import copy from "../../assets/copy.svg";

const Payment = () => {
  return (
    <div className="flex flex-col w-full px-10 h-screen py-8 overflow-y-auto">
      <div className="w-full overflow-x-auto">
        <table className="mt-10 w-full table-auto">
          <thead>
            <tr className="text-black/50 font-extralight">
              <th className="text-left pb-2 w-[300px]">Name</th>
              <th className="text-left pb-2 w-[300px]">Date</th>
              <th className="text-left pb-2 w-[300px]">Amount</th>
              <th className="text-left pb-2 w-[300px]">Payment Type</th>
              <th className="text-left pb-2 w-[300px]">Phone</th>
              <th className="text-left pb-2 w-[300px]">Email</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-clip pr-3 pb-4">Umoru Emmanuel okorie</td>
              <td className=" pr-3 pb-4">03, Jun 2023</td>
              <td className=" pr-3 pb-4">N100,000 </td>
              <td className=" pr-3 pb-4">Membership</td>
              <td className=" pr-3 pb-4">
                <div className="flex items-center gap-1">
                  <p>0819238473</p>
                  <img src={copy} />
                </div>
              </td>
              <td className=" pr-3 pb-4">
                <div className="flex items-center gap-1">
                  <p>Umoru.emmanuel@yahoo.com</p>
                  <img src={copy} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-clip pr-3 pb-4">Umoru Emmanuel okorie</td>
              <td className=" pr-3 pb-4">03, Jun 2023</td>
              <td className=" pr-3 pb-4">N100,000 </td>
              <td className=" pr-3 pb-4">Membership</td>
              <td className=" pr-3 pb-4">
                <div className="flex items-center gap-1">
                  <p>0819238473</p>
                  <img src={copy} />
                </div>
              </td>
              <td className=" pr-3 pb-4">
                <div className="flex items-center gap-1">
                  <p>Umoru.emmanuel@yahoo.com</p>
                  <img src={copy} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
