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
  const [propt, setPropt] = useState([
    {
      imageLink: "",
      price: 250_000_000,
      description: `Newly constructed 5 bedroom detached penthouse with swimming pool and a bq.

Land size - 1000 sqms piece of land.

Location - Engr Lere Adigun GRA, Bashorun Ibadan.

Net - NGN 300,000,000

Facilities -

? Full POP
? Gym house
? Swimming pool
? A penthouse
? Guest toilet
? Modern toilets
? Heat extractor
? Fitted chandeliers
? Microwave
? Gas Cooker
? Family Lounge
? Walk-in Closet
? Water heaters
? Balcony view
? Serene environment
? 24/7 security
? 24/7 power supply`,
      roomNumber: "12",
      name: "5 Bedroom Detached Duplex",
      type: "Duplex",
      plotSize: "300 sqm",
      location: " New Bodija Estate Bodija Ibadan Oyo state Nigeria.",
      buildingFloorArea: "100/100 sq",
    },
  ]);

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
      <div className="flex lg:flex-row flex-col items-start gap-5 mt-10 mb-[12rem]">
        {/* MAIN SECTION STARTS HERE */}
        <div className="lg:flex-1 w-full max-w-[70%] h-full">
          <div className="w-full h-[500px]">
            <img
              src={
                propt[0]?.imageLink ||
                "https://images.propertypro.ng/large/exclusive-4-bedrooms-duplex-with-2bedroom-bungalow-O6sjXggTKHU5CwNoyYnG.jpg"
              }
              className="object-contain h-auto max-w-[92vw] rounded-sm lg:max-h-[500px] lg:w-full"
            />
          </div>

          <div className="w-full h-max flex flex-col items-start">
            <h1 className="w-full text-2xl flex flex-wrap font-semibold h-max my-5">
              {propt[0]?.name}{" "}
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
                  src={
                    room ||
                    "https://images.propertypro.ng/large/exclusive-4-bedrooms-duplex-with-2bedroom-bungalow-O6sjXggTKHU5CwNoyYnG.jpg"
                  }
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
              <p className="whitespace-pre">{propt[0]?.description}</p>
            </div>
          </div>
        </div>
        {/* MAIN SECTION ENDS HERE */}

        {/* SIDE SECTION STARTS HERE */}
        <div className="lg:min-w-[30px] flex items-center justify-center h-max min-h-[500px] pb-7 lg:mt-0 p-5 shadow ">
          <div className="w-full h-[400px] rounded-md px-3 flex items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h1 className="text-2xl text-center text-[#FD6602] lg:px-4 lg:my-5">
                Contact Seller
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
                    Chat on WhatsApp
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
