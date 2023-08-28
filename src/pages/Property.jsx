import React, { useEffect } from "react";
import property1 from "../assets/property1.png";
import location from "../assets/location 2.svg";
import sqft from "../assets/sqft.svg";
import room from "../assets/room.svg";
import { useDispatch, useSelector } from "react-redux";
import { getProperty, resetProperty } from "../Redux/Features/propertySlice";

const Property = () => {
  const dispatch = useDispatch();
  const { property } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(getProperty());

    return () => {
      dispatch(resetProperty());
    };
  }, []);
  return (
    <div className="lg:px-[64px] w-full min-h-screen h-full px-5 ">
      {/* TITLE AND SEARCH BAR SECTION STARTS */}
      <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between lg:gap-0 gap-10 my-20">
        <h1 className="w-full text-5xl font-semibold">
          Find The Best <br /> Property
        </h1>
        <div className="flex items-center gap-2 w-full">
          <input className="w-full focus:outline-none h-10 appearance-none border-[1px] border-black/25 px-3 py-2 rounded-lg" />
          <button className="w-max px-3 py-2 rounded-lg h-10 bg-black text-sm text-white">
            Search
          </button>
        </div>
      </div>
      {/* TITLE AND SEARCH BAR SECTION STARTS */}

      {/* PROPERTY DISPLAY SECTION STARTS */}
      <div className="w-full lg:flex-wrap flex lg:flex-row flex-col h-max items-center justify-start gap-[6.79rem] py-10 px-5 lg:px-0">
        {property
          ? property?.properties?.map((item) => (
              <div key={item._id} className="card shadow-md shadow-black/50 ">
                <div className="flex flex-col w-full h-full ">
                  <img
                    src={item.imageLink}
                    className=" h-[300px] w-full object-cover rounded-t-lg"
                  />
                  <div className="w-full h-full p-3 rounded-b-lg flex flex-col gap-5  py-5">
                    <h1 className="w-full text-3xl font-semibold">
                      N{item.price}
                    </h1>
                    <p className="w-[300px]">{item.description}</p>

                    <div className="w-full flex items-center gap-3 mt-4">
                      <img
                        src={location}
                        className=" h-5 w-5 object-cover rounded-t-lg"
                      />
                      <p>{item.location}</p>
                    </div>

                    <div className="w-full flex items-center justify-between">
                      <div className="w-full flex items-center gap-3">
                        <img
                          src={sqft}
                          className=" h-5 w-5 object-cover rounded-t-lg"
                        />
                        <p>4000 sqft</p>
                      </div>

                      <div className="w-full flex items-center justify-center gap-3">
                        <img
                          src={room}
                          className=" h-5 w-5 object-cover rounded-t-lg"
                        />
                        <p className="">4 Bedroom</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      {/* PROPERTY DISPLAY SECTION ENDS */}
    </div>
  );
};

export default Property;
