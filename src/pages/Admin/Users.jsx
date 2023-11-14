import React, { useEffect, useState } from "react";
import view from "../../assets/view_icon.svg";
import copy from "../../assets/copy.svg";
import load from "../../assets/loading.json";
import Lottie from "lottie-react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, usersReset } from "../../Redux/Features/userSlice";
import { MdMail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { GrRefresh } from "react-icons/gr";
import {
  getAdminUserPayment,
  resetAdminUserPayment,
} from "../../Redux/Features/adminUserPayment";
import { withdrawalDetailsUpdate } from "../../Redux/Features/WithdrawalDetailsSlice";
import {
  resetShoppingPoints,
  uploadPoints,
} from "../../Redux/Features/addShoppingPointsSlice";
import {
  getUsersStatus,
  resetUsersStatus,
} from "../../Redux/Features/UserStatusSlice";
import { ToastContainer, toast } from "react-toastify";

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState("bio");
  const [selected, setSelected] = useState("");
  const [sp, setSp] = useState({
    shoppingPoints: "",
    uid: "",
  });
  const { allUsers, usersError, usersLoading, usersMessage, usersSuccess } =
    useSelector((state) => state.users);

  const {
    usersStatus,
    usersStatusSuccess,
    usersStatusError,
    usersStatusMessage,
  } = useSelector((state) => state.usersStat);

  const {
    adminUserPayment,
    adminUserPaymentError,
    adminUserPaymentSuccess,
    adminUserPaymentMessage,
    adminUserPaymentLoading,
  } = useSelector((state) => state.adminUserPayment);

  const {
    shoppingPointsLoading,
    shoppingPointsSuccess,
    shoppingPointsError,
    shoppingPointsMessage,
  } = useSelector((state) => state.shoppingPoints);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 7;
  const firstIndex = pageNumber * itemsPerPage;

  const pageCount = Math.ceil(allUsers.length / itemsPerPage);

  const changePage = (selected) => {
    setPageNumber(selected.selected);
    // console.log("selected Number" + selected);
  };

  const bioData = () => {
    return (
      <div className="bg-white lg:p-4 p-4 rounded-lg h-[95%] w-[80%] relative">
        {/* CLOSE BUTTON STARTS */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute -top-5 flex items-center z-10 justify-center lg:-right-4 right-2 h-[40px] w-[40px] rounded-full p-1 bg-black text-white cursor-pointer"
        >
          <h1 className="text-lg font-bold">X</h1>
        </div>
        {/* CLOSE BUTTON ENDS */}

        <div className="flex items-center gap-12 font-sans px-5">
          <p
            className={`${
              display === "bio"
                ? "font-semibold border-b-2 border-[#FD6602] cursor-pointer"
                : "font-normal cursor-pointer"
            }`}
            onClick={() => setDisplay("bio")}
          >
            Bio Data
          </p>

          <p
            className={`${
              display === "history"
                ? "font-semibold border-b-2 border-[#FD6602] cursor-pointer"
                : "font-normal cursor-pointer"
            }`}
            onClick={() => setDisplay("history")}
          >
            Payment History
          </p>
        </div>

        <div className="flex flex-col w-full px-5 py-2">
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
                <FaAddressBook color="#FD6602" />:
                <p>{selected?.officeAddress}</p>
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
              <p>: {selected.monthlyIncome ? selected.monthlyIncome : "N/A"}</p>
            </div>

            <div className="w-full flex items-start justify-between capitalize">
              <p>year of service</p>
              <p>
                : {selected.yearsOfService ? selected.yearsOfService : "N/A"}
              </p>
            </div>

            <div className="w-full flex items-start justify-between capitalize">
              <p>Retirement Age</p>
              <p>: {selected.retirementAge ? selected.retirementAge : "N/A"}</p>
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
            <h1 className="font-semibold text-lg">Next Of Kin Information</h1>
            <div className="w-full flex items-start justify-between">
              <p>Name</p>
              <p>: {selected.nextOfKinName ? selected.nextOfKinName : "N/A"}</p>
            </div>
            <div className="w-full flex items-start justify-between">
              <p>Home Address</p>
              <p>
                :{" "}
                {selected.nextOfKinAddress ? selected.nextOfKinAddress : "N/A"}
              </p>
            </div>
            <div className="w-full flex items-start justify-between">
              <p>Relationship</p>
              <p>: {selected.relationship ? selected.relationship : "N/A"}</p>
            </div>
            <div className="w-full flex items-start justify-between">
              <p>Phone Number</p>
              <p>
                :{" "}
                {selected.nextOfKinPhoneNumber
                  ? selected.nextOfKinPhoneNumber
                  : "N/A"}
              </p>
            </div>
            <div className="w-full flex items-start justify-between">
              <p>Email</p>
              <p>
                : {selected.nextOfKinEmail ? selected.nextOfKinEmail : "N/A"}
              </p>
            </div>
          </div>
          {/* COLUMN TWO ENDS HERE */}

          {/* COLUMN TWO STARTS HERE */}
          {/* <div className="w-full flex flex-col items-start justify-between gap-9">
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
          </div> */}
          {/* COLUMN TWO ENDS HERE */}
        </div>
        {/* BOTTOM SECTION STARTS HERE */}
        {/* BIO DATA SECTION ENDS */}
      </div>
    );
  };

  const payHistory = () => {
    return (
      <div className="bg-white lg:p-4 p-4 rounded-lg h-[95%] w-[80%] relative">
        {/* CLOSE BUTTON STARTS */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute -top-5 flex items-center z-10 justify-center lg:-right-4 right-2 h-[40px] w-[40px] rounded-full p-1 bg-black text-white cursor-pointer"
        >
          <h1 className="text-lg font-bold">X</h1>
        </div>
        {/* CLOSE BUTTON ENDS */}

        <div className="flex items-center gap-12 font-sans px-5">
          <p
            className={`${
              display === "bio"
                ? "font-semibold border-b-2 border-[#FD6602] cursor-pointer"
                : "font-normal cursor-pointer"
            }`}
            onClick={() => setDisplay("bio")}
          >
            Bio Data
          </p>

          <p
            className={`${
              display === "history"
                ? "font-semibold border-b-2 border-[#FD6602] cursor-pointer"
                : "font-normal cursor-pointer"
            }`}
            onClick={() => setDisplay("history")}
          >
            Payment History
          </p>
        </div>

        <div className="w-full mt-8 flex flex-col gap-3 px-5 h-[90%] overflow-y-scroll">
          {/* CARD SECTION STARTS HERE */}
          <div className="h-[199px] w-[360px] px-4 py-4 rounded-lg user_card_banner bg-cover flex flex-col text-white  gap-10">
            <p>Amount Raised</p>
            <div className="flex w-full items-end gap-3 text-white">
              <p className="text-4xl font-semibold">N1,000,000</p>
            </div>
          </div>
          {/* CARD SECTION ENDS HERE */}

          {adminUserPaymentLoading ? (
            <div className="flex w-full items-center justify-center mt-28 text-2xl text-[#FD6602]">
              Fetching Payment History.... Please Wait
            </div>
          ) : (
            <div className="w-full">
              <table className="mt-2 w-full table-auto">
                <thead>
                  <tr className="text-black/50 font-extralight">
                    <th className="text-left pb-4 w-2/5">Amount</th>
                    <th className="text-left pb-4 w-2/5">Date</th>
                    <th className="text-left pb-4 w-2/5">Title</th>
                  </tr>
                </thead>

                <tbody>
                  {adminUserPayment &&
                    adminUserPayment?.payments.map((item) => (
                      <tr key={item._id}>
                        <td className="text-clip pr-3 pb-4">{item.amount}</td>
                        <td className=" pr-3 pb-4">
                          {formatDate(item.datePaid)}
                        </td>
                        <td className=" pr-3 pb-4">{item.tag}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const showBioModal = (item) => {
    dispatch(getAdminUserPayment(item._id));
    setSelected(item);
    setIsOpen(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (shoppingPointsSuccess) {
      console.log(shoppingPointsMessage);
      setSp({ ...sp, shoppingPoints: "", uid: "" });
      dispatch(getUsers());

      setTimeout(() => {
        dispatch(resetShoppingPoints());
      }, 2000);
    }

    if (shoppingPointsError) {
      console.log(shoppingPointsMessage);
      setSp({ ...sp, shoppingPoints: "", uid: "" });
      setTimeout(() => {
        dispatch(resetShoppingPoints());
      }, 2000);
    }
  }, [shoppingPointsSuccess, shoppingPointsError, shoppingPointsMessage]);

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
    if (adminUserPaymentSuccess) {
      setTimeout(() => {
        dispatch(resetAdminUserPayment());
      }, 2000);
    }

    if (adminUserPaymentError) {
      setTimeout(() => {
        dispatch(resetAdminUserPayment());
      }, 2000);
    }
  }, [
    adminUserPaymentError,
    adminUserPaymentSuccess,
    adminUserPaymentMessage,
    adminUserPaymentLoading,
  ]);

  // useEffect(() => {
  //   if (allUsers.length > 0) {
  //     console.log(allUsers.map((user) => user.shoppingPoints));
  //   }
  // }, [allUsers]);

  useEffect(() => {
    dispatch(getUsersStatus());
    if (allUsers.length > 0) {
      return;
    } else {
      dispatch(getUsers());
    }
  }, []);

  useEffect(() => {
    dispatch(getUsersStatus());
  }, []);

  useEffect(() => {
    if (usersStatusSuccess) {
      setTimeout(() => {
        dispatch(resetUsersStatus());
      }, 2500);
    }
    if (usersStatusError) {
      toast.error(usersStatusMessage);
      setTimeout(() => {
        dispatch(resetUsersStatus());
      }, 2500);
    }
  }, [usersStatusSuccess, usersStatusError, usersStatusMessage]);

  const addPoints = (id, points) => {
    if (sp.shoppingPoints) {
      const p = parseInt(sp.shoppingPoints) + parseInt(points);
      // console.log(p);
      const reqBody = {
        shoppingPoints: p,
        uid: id,
      };
      // console.log(reqBody.shoppingPoints);
      dispatch(uploadPoints(reqBody));
    }
  };

  return (
    <div className="flex flex-col w-full px-10 h-screen py-8 overflow-y-auto">
      <ToastContainer position="top-center" hideProgressBar />
      <div className="flex w-full items-start gap-14">
        <div className="h-[199px] w-[360px] px-4 py-4 rounded-lg user_card_banner bg-cover flex flex-col text-white  gap-10">
          <p>Active Users</p>
          <div className="flex w-full items-end gap-3 text-white">
            <p className="text-7xl font-semibold">
              {usersStatus && usersStatus.paidCount}
            </p>
            <p>Users</p>
          </div>
        </div>
        <div className="h-[199px] w-[360px]  rounded-lg user_card_banner bg-cover ">
          <div className="h-[199px] w-[360px] px-4 py-4 rounded-lg user_card_banner bg-cover flex flex-col text-white  gap-10 ">
            <p>Non-Active Users</p>
            <div className="flex w-full items-end gap-3 text-white">
              <p className="text-7xl font-semibold">
                {usersStatus && usersStatus.notPaidCount}
              </p>
              <p>Users</p>
            </div>
          </div>
        </div>
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
              ? allUsers
                  .slice(firstIndex, firstIndex + itemsPerPage)
                  .map((item) => (
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

                      <td className="flex items-center gap-1 w-full py-2 pr-3">
                        <p className="text-black text-lg ">
                          {item.shoppingPoints}
                        </p>
                        <div className=" px-2 text-2xl h-max w-max rounded-md flex items-center justify-center">
                          <input
                            type="number"
                            max={3}
                            className="font-sans w-10 h-9 rounded-md flex items-center justify-center border appearance-none text-sm text-center border-gray-400"
                            placeholder="add"
                            onChange={(e) =>
                              setSp({ ...sp, shoppingPoints: e.target.value })
                            }
                          />
                        </div>
                        <p
                          className="cursor-pointer font-bold "
                          onClick={() =>
                            addPoints(item._id, item.shoppingPoints)
                          }
                        >
                          {shoppingPointsLoading ? "Update" : "Add"}
                        </p>
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

      <div className="flex items-end justify-between w-full mt-[30px]">
        <div
          onClick={() => dispatch(getUsers())}
          className="text-[#FD6602] flex items-center gap-4 w-full cursor-pointer"
        >
          <GrRefresh color="#FD6602" className="cursor-pointer" /> Refresh Users
        </div>

        <div className="w-full flex flex-col items-end justify-center ">
          <p className="text-base text-[#FD6602]  mb-[7px] mr-6">
            showing {Math.floor(firstIndex + itemsPerPage)} of {allUsers.length}{" "}
            entries
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

      {usersLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
          <div className="bg-transparent lg:p-8 p-4 rounded-lg h-max w-[300px] relative overflow-y-auto">
            <Lottie animationData={load} width={200} height={200} loop={true} />
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          {display === "bio" ? bioData() : payHistory()}
        </div>
      )}

      {usersLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
          <div className="bg-transparent lg:p-8 p-4 rounded-lg h-max w-[300px] relative overflow-y-auto">
            <Lottie animationData={load} width={200} height={200} loop={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
