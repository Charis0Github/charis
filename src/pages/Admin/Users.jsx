import React, { useEffect, useState } from "react";
import view from "../../assets/view_icon.svg";
import copy from "../../assets/copy.svg";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, usersReset } from "../../Redux/Features/userSlice";
import { MdMail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const { allUsers, usersError, usersLoading, usersMessage, usersSuccess } =
    useSelector((state) => state.users);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  const showBioModal = (item) => {
    setSelected(item);
    setIsOpen(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (usersSuccess) {
      setTimeout(() => {
        dispatch(usersReset());
      }, 2000);
    }

    if (usersError) {
      setTimeout(() => {
        dispatch(usersReset());
      }, 2000);
    }
  }, [usersSuccess, usersError, usersMessage]);

  useEffect(() => {
    if (allUsers.length > 0) {
      return;
    } else {
      dispatch(getUsers());
    }
  }, []);

  return (
    <div className="flex flex-col w-full px-10 h-screen py-8 overflow-y-auto">
      <div className="flex w-full items-start gap-10">
        <div className="h-[199px] w-[360px]  rounded-lg user_card_banner bg-cover"></div>
        <div className="h-[199px] w-[360px]  rounded-lg user_card_banner bg-cover "></div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="mt-10 w-full table-auto">
          <thead>
            <tr className="text-black/50 font-extralight">
              <th className="text-left pb-2 ">Name</th>
              <th className="text-left pb-2 ">Date Joined</th>
              <th className="text-left pb-2 ">Share Capital</th>
              <th className="text-left pb-2 ">Gender</th>
              <th className="text-left pb-2">Phone</th>
              <th className="text-left pb-2 ">Email</th>
              <th className="text-left pb-2 ">Points</th>
              <th className="text-left pb-2 ">Action</th>
            </tr>
          </thead>

          <tbody>
            {allUsers
              ? allUsers.map((item) => (
                  <tr key={item._id}>
                    <td className="text-clip pr-3">{item.name}</td>
                    <td className=" pr-3">{formatDate(item.createdAt)}</td>
                    <td className=" pr-3">
                      {item.shareCapital ? item.shareCapital : "N/A"}
                    </td>
                    <td className=" pr-3">{item.gender}</td>
                    <td className=" pr-3 truncate">
                      <div className="flex items-center gap-1">
                        {item.phoneNumber.substring(0, 5) + "...."}
                        <img src={copy} />
                      </div>
                    </td>
                    <td className=" pr-3">
                      <div className="flex items-center gap-1">
                        {item.email.substring(0, 8) + "...."}
                        <img src={copy} />
                      </div>
                    </td>

                    <td className="flex items-center gap-2 w-full py-2 pr-3">
                      <p className="text-black text-lg ">1</p>
                      <div className="text-white px-5 text-2xl h-max rounded-md bg-black flex items-center gap-5">
                        <p>-</p>
                        <p>+</p>
                      </div>
                    </td>

                    <td className=" ">
                      <div
                        onClick={() => showBioModal(item)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <p className="text-[#FD6602]">views</p>
                        <img src={view} />
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>

      {usersLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
          <div className="bg-transparent lg:p-8 p-4 rounded-lg h-max w-[300px] relative overflow-y-auto">
            <Lottie animationData={load} width={200} height={200} loop={true} />
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white lg:p-4 p-4 rounded-lg h-[95%] w-[80%] relative overflow-y-auto">
            {/* CLOSE BUTTON STARTS */}
            <div
              onClick={() => setIsOpen(false)}
              className="absolute top-3 flex items-center justify-center lg:right-5 right-2 h-[20px] w-[20px] rounded-full p-1 bg-black text-white cursor-pointer"
            >
              <h1 className="text-xs font-bold">X</h1>
            </div>
            {/* CLOSE BUTTON ENDS */}

            <div className="flex flex-col w-full px-5 py-2">
              <div className="flex items-center gap-12 font-sans">
                <p>Bio Data</p>
                <p>Payment History</p>
              </div>

              {/* BIO DATA SECTION STARTS */}
              {/* TOP SECTION STARTS HERE */}
              <div className="flex items-center gap-6 mt-10">
                <img
                  src={selected?.imageLink}
                  className="w-[211px] h-[228px] object-cover"
                />
                <div className="flex flex-col gap-4">
                  <h1 className="text-black text-3xl font-semibold capitalize flex items-baseline gap-2">
                    {selected?.name}
                    <p className="capitalize text-black/70 text-base font-extralight">
                      ({selected?.nationality})
                    </p>
                  </h1>

                  <p className="capitalize text-lg">{selected?.profession}</p>
                  <div className="flex items-center gap-2">
                    <MdMail color="#FD6602" />:<p>{selected?.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsTelephoneFill color="#FD6602" />:
                    <p>{selected?.phoneNumber}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaAddressBook color="#FD6602" />:<p>{selected?.address}</p>
                  </div>
                </div>
              </div>
              {/* TOP SECTION ENDS HERE */}
            </div>

            {/* BOTTOM SECTION STARTS HERE */}
            <div className="w-full flex items-start px-5 mt-8 gap-12">
              {/* COLUMN ONE STARTS HERE */}
              <div className="w-full flex flex-col items-start gap-3">
                <h1 className="font-semibold text-lg">More Information</h1>
                <div className="w-full flex items-start justify-between">
                  <p>Date of Birth</p>
                  <p>: {selected.dob ? selected.dob : "N/A"}</p>
                </div>

                <div className="w-full flex items-start justify-between capitalize">
                  <p>L.G.A Of Origin</p>
                  <p>: {selected.lga ? selected.lga : "N/A"}</p>
                </div>

                <div className="w-full flex items-start justify-between capitalize">
                  <p>status rank</p>
                  <p>: {selected.statusRank ? selected.statusRank : "N/A"}</p>
                </div>

                <div className="w-full flex items-start justify-between capitalize">
                  <p>monthly Income</p>
                  <p>
                    : {selected.monthlyIncome ? selected.monthlyIncome : "N/A"}
                  </p>
                </div>

                <div className="w-full flex items-start justify-between capitalize">
                  <p>year of service</p>
                  <p>
                    :{" "}
                    {selected.yearsOfService ? selected.yearsOfService : "N/A"}
                  </p>
                </div>

                <div className="w-full flex items-start justify-between capitalize">
                  <p>Retirement Age</p>
                  <p>
                    : {selected.retirementAge ? selected.retirementAge : "N/A"}
                  </p>
                </div>

                <div className="w-full flex items-start justify-between capitalize">
                  <p>Educational Qualification</p>
                  <p>
                    :{" "}
                    {selected.educationalQualification
                      ? selected.educationalQualification
                      : "N/A"}
                  </p>
                </div>
              </div>
              {/* COLUMN ONE ENDS HERE */}

              {/* COLUMN TWO STARTS HERE */}
              <div className="w-full flex flex-col items-start gap-3">
                <h1 className="font-semibold text-lg">
                  Next Of Kin Information
                </h1>
                <div className="w-full flex items-start justify-between">
                  <p>Name</p>
                  <p>
                    : {selected.nextOfKinName ? selected.nextOfKinName : "N/A"}
                  </p>
                </div>
                <div className="w-full flex items-start justify-between">
                  <p>Home Address</p>
                  <p>
                    :{" "}
                    {selected.nextOfKinAddress
                      ? selected.nextOfKinAddress
                      : "N/A"}
                  </p>
                </div>
                <div className="w-full flex items-start justify-between">
                  <p>Relationship</p>
                  <p>
                    : {selected.relationship ? selected.relationship : "N/A"}
                  </p>
                </div>
                <div className="w-full flex items-start justify-between">
                  <p>Phone Number</p>
                  <p>
                    :{" "}
                    {selected.nextOfKinphoneNumber
                      ? selected.nextOfKinphoneNumber
                      : "N/A"}
                  </p>
                </div>
                <div className="w-full flex items-start justify-between">
                  <p>Email</p>
                  <p>
                    :{" "}
                    {selected.nextOfKinEmail ? selected.nextOfKinEmail : "N/A"}
                  </p>
                </div>
              </div>
              {/* COLUMN TWO ENDS HERE */}

              {/* COLUMN TWO STARTS HERE */}
              <div className="w-full flex flex-col items-start justify-between gap-9">
                <div className="w-full flex flex-col items-start gap-3">
                  <h1 className="font-semibold text-lg">House Information</h1>
                  <div className="w-full flex items-start justify-between">
                    <p>House Type</p>
                    <p>: {selected.houseType ? selected.houseType : "N/A"}</p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <p>House Size</p>
                    <p>: {selected.houseSize ? selected.houseSize : "N/A"}</p>
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <p>preferred Location</p>
                    <p>
                      :{" "}
                      {selected.preferredLocation
                        ? selected.preferredLocation
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start gap-2">
                  <h1 className="font-semibold text-lg">Payment Information</h1>
                  <div className="w-full flex items-center justify-start">
                    <p>{selected.paymentPlan ? selected.paymentPlan : "N/A"}</p>
                  </div>
                </div>
              </div>
              {/* COLUMN TWO ENDS HERE */}
            </div>
            {/* BOTTOM SECTION STARTS HERE */}
            {/* BIO DATA SECTION ENDS */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
