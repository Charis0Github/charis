import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdMail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { GrRefresh } from "react-icons/gr";
import { toast } from "react-hot-toast";

/*
 
Building a house:
-C of O
-Community Paper
-Deed of Transfer (optional)
-Approved Building Plan
-Survey Plan
-Bill of Quantities (optional)
Proof of Earnings


House completion:
-C of O
-Community Paper
-Deed of Transfer (optional)
-Approved Building Plan
-Survey Plan
-Bill of Quantities (optional)
Proof of Earnings

External house offer:
Offer Letter 
Proof of Earnings

Buying a house:
Offer Letter 
Proof of Earnings
 

*/

export const UploadDocumentSection = ({ setIsOpen }) => {
  const [display, setDisplay] = useState(1);
  const DocumentSectionList = [
    "Buying a house",
    "Building a house or House completion",
  ];
  return (
    <div className="bg-white lg:p-4 p-4 rounded-lg h-[95%] w-[80%] max-w-3xl  overflow-y-auto  overflow-x-hidden relative z-50">
      {/* CLOSE BUTTON STARTS */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute top-1 flex items-center z-10 justify-center lg:right-1 right-10 h-[32px] w-[32px] rounded-full p-1 bg-black text-white cursor-pointer"
      >
        <h1 className="text-lg font-bold">X</h1>
      </div>
      {/* CLOSE BUTTON ENDS */}
      <div className="flex gap-6 font-sans px-5 h-fit cursor-pointer">
        {DocumentSectionList.map((type, id) => (
          <p
            className={`${
              display === id + 1
                ? "font-semibold border-b-2 border-[#FD6602] cursor-pointer"
                : "font-normal cursor-pointer"
            }`}
            onClick={() => setDisplay(id + 1)}
          >
            {type}
          </p>
        ))}
      </div>
      {/* BOTTOM SECTION STARTS HERE */}

      <div className="w-full flex items-start px-5 mt-8 gap-12 mb-20">
        {/* COLUMN ONE STARTS HERE */}
        {display === 1 && (
          <div className="w-full flex flex-col items-start gap-3">
            <h1 className="font-semibold text-lg">
              {DocumentSectionList[display - 1]}
            </h1>

            <div className="w-full grid gap-4">
              <p>Proof of Earnings:</p>
              <p>
                <input type="file" name="" id="" />
              </p>
            </div>
            <div className="w-full grid gap-4">
              <p>Offer Letter:</p>
              <p>
                <input type="file" name="" id="" />
              </p>
            </div>

            <button className="file-upload-btn">Upload </button>
          </div>
        )}
        {display === 2 && (
          <div className="w-full flex flex-col items-start gap-3">
            <h1 className="font-semibold text-lg">
              {DocumentSectionList[display - 1]}
            </h1>

            <div className="w-full grid gap-4">
              <p>Proof of Earnings:</p>
              <p>
                <input type="file" name="" id="" />
              </p>
            </div>
            <div className="w-full grid gap-4">
              <p>Certificate Of Ownership (C of O):</p>
              <p>
                <input type="file" name="" id="" />
              </p>
            </div>
            <div className="w-full grid gap-4">
              <p>Community Paper:</p>
              <p>
                <input type="file" name="" id="" />
              </p>
            </div>
            <div className="w-full grid gap-4">
              <p>Approved Building Plan:</p>
              <p>
                <input type="file" name="" id="" />
              </p>
            </div>
            <div className="w-full grid gap-4">
              <p>Survey Plan:</p>
              <p>
                <input type="file" name="" id="" />
              </p>
            </div>
            <div className="w-full grid gap-4">
              <p>Deed of Transfer (optional):</p>
              <p>
                <input type="file" name="" id="" />
              </p>
            </div>
            <div className="w-full grid gap-4">
              <p>Bill of Quantities (optional):</p>
              <p>
                <input type="file" name="" id="" />
              </p>
            </div>

            <button className="file-upload-btn">Upload </button>
          </div>
        )}

        {/* COLUMN ONE ENDS HERE */}
      </div>
      <a href="https://api.whatsapp.com/send?phone=2349124224900">
        <p className="warning bg-orange-200">
          Please note that the Cooperative has partners that can facilitate the
          preparation of any document that you need at a reasonable cost.
          <button className="bg-[rgb(253,102,2)] p-1 pl-4 pr-4 rounded-lg ml-3">
            contact us
          </button>
        </p>
      </a>
    </div>
  );
};
