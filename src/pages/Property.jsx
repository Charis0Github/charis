import React, { useEffect, useState } from "react";
import property1 from "../assets/property1.png";
import location from "../assets/location 2.svg";
import sqft from "../assets/sqft.svg";
import room from "../assets/room.svg";
import load from "../assets/loading.json";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { getProperty, resetProperty } from "../Redux/Features/propertySlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Property = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newProperty, setNewProperty] = useState([]);

  const {
    property,
    propertySuccess,
    propertyLoading,
    propertyError,
    propertyMessage,
  } = useSelector((state) => state.property);

  const { user, userDetails } = useSelector((state) => state.auth);

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

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (property) {
      const results = property?.properties.filter((property) =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  useEffect(() => {
    if (propertySuccess) {
      toast.success("Property Retrieved Successfully");
      // setIsListing(false);
      dispatch(resetProperty());
      setNewProperty(property);
    }
    if (propertyError) {
      toast.error(propertyMessage);
      dispatch(resetProperty());
    }
  }, [propertySuccess, propertyError, propertyMessage]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults(property?.properties);
    }
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getProperty());
    if (property) {
      setSearchResults(property?.properties);
    } else {
      dispatch(getProperty());
    }
  }, []);

  return (
    <div className="lg:px-[64px] w-full min-h-screen h-full px-2 ">
      <ToastContainer position="top-center" hideProgressBar />
      {/* TITLE AND SEARCH BAR SECTION STARTS */}
      <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between lg:gap-0 gap-10 my-20">
        <h1 className="w-full text-5xl font-semibold">
          Find The Best <br /> Property
        </h1>
        <div className="flex items-center gap-2 w-full">
          <input
            value={searchTerm}
            onChange={handleSearch}
            className="w-full focus:outline-none h-10 appearance-none border-[1px] border-black/25 px-3 py-2 rounded-lg"
          />
          <button className="w-max px-3 py-2 rounded-lg h-10 bg-black text-sm text-white">
            Search
          </button>
        </div>
      </div>
      {/* TITLE AND SEARCH BAR SECTION STARTS */}

      {userDetails?.userData?.status === "paid" && (
        <div className="w-full flex justify-end">
          <div
            onClick={() => navigate("/dashboard")}
            className="w-full h-[32px] flex bg-black items-center justify-center gap-5 rounded-[5px] cursor-pointer z-10"
          >
            <h1 onClick={() => navigate("/dashboard")} className="text-white">
              Go Main Dashboard
            </h1>
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
        </div>
      )}

      {/* PROPERTY DISPLAY SECTION STARTS */}
      <div className="w-full lg:flex-wrap flex lg:flex-row flex-col h-max items-center justify-start gap-[6.79rem] py-10 px-5 lg:px-0">
        {searchResults ? (
          searchResults.map((item) => (
            <div
              onClick={() => navigate(`/list-property/${item._id}`)}
              key={item._id}
              className="card shadow-md shadow-black/50 cursor-pointer "
            >
              <div className="flex flex-col w-full h-full ">
                <img
                  src={item.imageLink}
                  className=" h-[300px] w-full object-cover rounded-t-lg"
                />
                <div className="w-full  p-3 rounded-b-lg flex flex-col gap-5 py-2 mb-2">
                  <h1 className="w-full text-2xl font-semibold h-max">
                    {item.name} ({item.type})
                  </h1>
                  <h1 className="w-full text-lg font-medium">
                    Price: N{formatNumber(item.price)}
                  </h1>
                  <p className="w-full text-ellipsis h-max overflow-y-auto">
                    {item.description.slice(0, 50)}...
                  </p>

                  <div className="w-full flex  items-center gap-3 mt-2">
                    <img
                      src={location}
                      className=" h-5 w-5 object-cover rounded-t-lg"
                    />
                    <p>{item.location}</p>
                  </div>

                  <div className="w-full flex items-center justify-between">
                    <div className="w-full flex items-center gap-3">
                      <p className="bg-[#FD6602] p-1 text-white text-sm rounded-md">
                        FA
                      </p>
                      <p>{item.buildingFloorArea + " "} sqm</p>
                    </div>

                    <div className="w-full flex items-center gap-3 place-self-start">
                      {/* <img
                        src={sqft}
                        className=" h-5 w-5 object-cover rounded-t-lg"
                      /> */}
                      <p className="bg-[#FD6602] text-sm p-1 text-white rounded-md">
                        PS
                      </p>
                      <p>{item.plotSize + " "} sqm</p>
                    </div>
                  </div>

                  <div className="w-full flex items-center gap-3">
                    <img
                      src={room}
                      className=" h-5 w-5 object-cover rounded-t-lg"
                    />
                    <p className="">
                      {item.roomNumber > 1
                        ? item.roomNumber + " " + "bedrooms"
                        : item.roomNumber + " " + "bedroom"}
                    </p>
                  </div>
                </div>

                <p className="p-3 mb-2 text-sm text-[#FD6602]">
                  Click card to View property
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No Properties Were Found</p>
          </div>
        )}
      </div>
      {/* PROPERTY DISPLAY SECTION ENDS */}

      {propertyLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
          <div className="bg-transparent lg:p-8 p-4 rounded-lg h-max w-[300px] relative overflow-y-auto">
            <Lottie animationData={load} width={200} height={200} loop={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Property;
