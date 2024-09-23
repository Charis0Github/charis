import React, { useEffect, useState } from "react";
import location from "../assets/location 2.svg";
import sqft from "../assets/sqft.svg";
import room from "../assets/room.svg";
import whatsapp from "../assets/whatsapp.svg";
import phone from "../assets/phone.svg";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SingleProperty = () => {
  const { property, propertyLoading } = useSelector((state) => state.property);
  const [propt, setPropt] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (property) {
      const filtered = property.properties.filter(
        (item) => item._id === params.id
      );
      setPropt(filtered);
    } else {
      return;
    }
  }, []);

  return (
    <div className="lg:px-[64px] w-full min-h-screen h-full px-5">
      <div className="flex lg:flex-row flex-col items-start gap-5 mt-10">
        {/* MAIN SECTION STARTS HERE */}
        <div className="lg:flex-1 w-full h-full">
          <div className="w-full h-[500px]">
            <img
              src={propt[0]?.imageLink}
              className="object-cover h-full w-full"
            />
          </div>

          <div className="w-full h-max flex flex-col items-start">
            <h1 className="w-full text-2xl flex flex-wrap font-semibold h-max my-5">
              {propt[0]?.name}
              <span className="text-[#FD6602]">({propt[0]?.type})</span>
            </h1>

            <h1 className="w-full text-xl font-semibold my-2">
              <span className="text-[#FD6602]">Price:</span> N
              {formatNumber(propt[0]?.price)}
            </h1>

            <div className=" flex items-center  gap-4 lg:w-1/2  w-full my-3">
              <div className="w-full flex items-center gap-2 mt-2">
                <img
                  src={location}
                  className=" h-5 w-5 object-cover rounded-t-lg"
                />
                <p>{propt[0]?.location}</p>
              </div>

              <div className="w-full flex items-center gap-3">
                <img
                  src={sqft}
                  className=" h-5 w-5 object-cover rounded-t-lg"
                />
                <p>{propt[0]?.buildingFloorArea + " "}</p>
              </div>

              <div className="w-full flex items-center justify-center gap-3">
                <p className="bg-[#FD6602] p-1 text-white rounded-md">
                  Plot size
                </p>
                <p>{propt[0]?.plotSize}</p>
              </div>
            </div>

            <div className=" flex items-center justify-start lg:w-1/2  w-full my-3">
              <div className="w-full flex items-center justify-start gap-3">
                <img
                  src={room}
                  className=" h-5 w-5 object-cover rounded-t-lg"
                />
                <p className="">
                  {propt[0]?.roomNumber > 1
                    ? propt[0]?.roomNumber + " " + "bedrooms"
                    : propt[0]?.roomNumber + " " + "bedroom"}
                </p>
              </div>
            </div>

            <div className="lg:w-2/3 w-full flex flex-col text-lg text-ellipsis my-6">
              <span className="text-[#FD6602]">Property Information</span>
              {propt[0]?.description}
            </div>
          </div>
        </div>
        {/* MAIN SECTION ENDS HERE */}

        {/* SIDE SECTION STARTS HERE */}
        <div className="lg:w-[330px] flex flex-col gap-4 w-full h-max pb-7 mt-10 lg:mt-0 px-5">
          <div
            onClick={() => navigate("/property")}
            className="w-full h-[32px] flex bg-black items-center justify-center gap-5 rounded-[5px] cursor-pointer z-10"
          >
            <h1 onClick={() => navigate("/property")} className="text-white">
              Go back to Property Listings
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

          <div className="w-full h-[400px] shadow-md shadow-black/50 rounded-md px-3 ">
            <div className="w-full h-full flex flex-col">
              <h1 className="text-2xl text-center text-[#FD6602] lg:px-4 lg:my-5">
                Contact Us
              </h1>

              <div className="lg:px-4 flex flex-col items-center gap-6 lg:mt-0 mt-5">
                <div className="flex items-center gap-8 justify-start w-full">
                  <img
                    src={location}
                    className="w-[20px] h-[25px] object-cover"
                  />
                  <p>
                    Address: 1, Ogbelaka st, Opp Federal High Court,
                    <br /> Sapele Rd, B/C.
                  </p>
                </div>

                {/* <div className="flex items-center gap-8 justify-start w-full">
                  <img src={phone} className="w-[20px] h-[25px] object-cover" />
                  <p>+234-813-873-5665</p>
                </div> */}

                <div className="flex items-center gap-8 justify-start w-full">
                  <img src={phone} className="w-[20px] h-[25px] object-cover" />
                  <p>+234-808-186-2750</p>
                </div>

                <div className="flex items-center gap-8 justify-start w-full">
                  <img
                    src={whatsapp}
                    className="w-[20px] h-[25px] object-cover"
                  />
                  <a
                    href="https://wa.link/20deup"
                    className="bg-green-600 p-2 rounded-md cursor-pointer text-white"
                  >
                    Chat With Us on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SIDE SECTION ENDS HERE */}
      </div>
    </div>
  );
};

export default SingleProperty;
