import React, { useEffect, useState } from "react";
import copy from "../../assets/copy.svg";
import load from "../../assets/loading.json";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { GrRefresh } from "react-icons/gr";
import {
  getAllPayment,
  resetAllUserPayment,
} from "../../Redux/Features/allUserPaymentSlice";
import { toast } from "react-hot-toast";

const Payment = () => {
  const {
    allUserPayment,
    allUserPaymentSuccess,
    allUserPaymentError,
    allUserPaymentMessage,
    allUserPaymentLoading,
  } = useSelector((state) => state.allPayment);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [pays, setPays] = useState([]);

  const itemsPerPage = 14;
  const firstIndex = pageNumber * itemsPerPage;

  const changePage = (selected) => {
    setPageNumber(selected.selected);
    // console.log("selected Number" + selected);
  };

  let pageCount;

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  const copyLink = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  useEffect(() => {
    if (allUserPayment) {
      return;
    } else {
      dispatch(getAllPayment());
    }
  }, []);

  useEffect(() => {
    if (allUserPaymentSuccess) {
      toast.success("Payments retrieved successfully");
      setTimeout(() => {
        dispatch(resetAllUserPayment());
      }, 2000);
    }

    if (allUserPayment) {
      console.log("It Actually exists");
      setPays(allUserPayment.payments);
      pageCount = Math.ceil(allUserPayment.payments.length / itemsPerPage);
    }

    if (allUserPaymentError) {
      setTimeout(() => {
        dispatch(resetAllUserPayment());
      }, 2000);
    }
  }, [
    allUserPaymentSuccess,
    allUserPaymentError,
    allUserPaymentMessage,
    allUserPayment,
  ]);

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
            {pays.length > 0 &&
              pays.slice(firstIndex, firstIndex + itemsPerPage).map((item) => (
                <tr key={item._id}>
                  <td className="text-clip pr-3 pb-4">
                    {item.userName && item.userName}
                  </td>
                  <td className=" pr-3 pb-4">{formatDate(item.datePaid)}</td>
                  <td className=" pr-3 pb-4">N {item.amount}</td>
                  <td className=" pr-3 pb-4">{item.tag}</td>
                  <td className=" pr-3 pb-4">
                    <div
                      onClick={() => copyLink(item.phoneNumber)}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <p>{item.phoneNumber && item.phoneNumber}</p>
                      <img src={copy} />
                    </div>
                  </td>
                  <td className=" pr-3 pb-4">
                    <div
                      onClick={() => copyLink(item.email)}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <p>{item.email && item.email}</p>
                      <img src={copy} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-end justify-between w-full mt-[30px]">
        <div
          onClick={() => dispatch(getAllPayment())}
          className="text-[#FD6602] flex items-center gap-4 w-full cursor-pointer"
        >
          <GrRefresh color="#FD6602" className="cursor-pointer" /> Refresh
          Payments
        </div>

        <div className="w-full flex flex-col items-end justify-center ">
          <p className="text-base text-[#FD6602] mt-[30px] mb-[7px] mr-6">
            showing {Math.floor(firstIndex + itemsPerPage)} of{" "}
            {allUserPayment && allUserPayment.payments.length} entries
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

      {allUserPaymentLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
          <div className="bg-transparent lg:p-8 p-4 rounded-lg h-max w-[300px] relative overflow-y-auto">
            <Lottie animationData={load} width={200} height={200} loop={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
