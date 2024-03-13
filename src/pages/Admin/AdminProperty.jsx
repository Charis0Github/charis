import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import location from "../../assets/location 2.svg";
import sqft from "../../assets/sqft.svg";
import room from "../../assets/room.svg";
import add from "../../assets/add.svg";
import Input from "../../components/Input";
import load from "../../assets/loading.json";
import Lottie from "lottie-react";
import {
  createProperty,
  getProperty,
  resetProperty,
  deleteProperty,
  getPendingProperty,
  editProperty,
} from "../../Redux/Features/propertySlice";
import { ToastContainer, toast } from "react-toastify";

const AdminProperty = () => {
  const [isOpen, setIsOpen] = useState();
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [display, setDisplay] = useState("approved");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchResults1, setSearchResults1] = useState([]);
  const [propertyForm, setPropertyForm] = useState({
    price: "",
    description: "",
    location: "",
    sqft: "",
    roomNumber: "",
    type: "",
    status: "available",
    name: "",
    file: "",
  });

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

  const dispatch = useDispatch();
  const {
    adminProperty,
    property,
    propertySuccess,
    propertyLoading,
    propertyError,
    propertyMessage,
  } = useSelector((state) => state.property);

  const handleSearch1 = (e) => {
    const term = e.target.value;
    setSearchTerm1(term);
    if (property.properties.length > 0) {
      const results = property?.properties?.filter((property) =>
        property.name.toLowerCase().includes(searchTerm1.toLowerCase())
      );
      setSearchResults1(results);
    }
  };

  const displayApproved = () => {
    return (
      <>
        {/* SEARCH SECTION STARTS HERE */}
        <div className="flex w-full items-start gap-3 mt-10">
          <input
            className="min-w-[440px] h-[45px] rounded-md p-3 appearance-none focus:outline-none border-[1px] border-black/25"
            placeholder="Type Location or Keyword"
            value={searchTerm1}
            onChange={handleSearch1}
          />
          <div className="w-max h-[45px] py-1 px-6 text-sm flex items-center justify-center text-white bg-[#FD6602] rounded-md">
            Search
          </div>
        </div>
        {/* SEARCH SECTION STARTS HERE */}

        {/* PROPERTY DISPLAY SECTION STARTS */}
        <div className="w-full lg:flex-wrap flex lg:flex-row flex-col h-max items-center justify-start gap-[4rem] py-10 px-5 lg:px-0">
          {searchResults1.length > 0 &&
            searchResults1.map((item) => (
              <div key={item._id} className="card1 shadow-md shadow-black/50 ">
                <div className="flex flex-col w-full ">
                  <img
                    src={item.imageLink}
                    className=" h-[200px] w-full object-cover rounded-t-lg"
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

                  <div className="flex items-center justify-between w-full  px-3 gap-5">
                    {/* <div
                        onClick={() => dispatch(editProperty(item._id))}
                        className="flex items-center justify-center cursor-pointer h-[40px] gap-3 w-full bg-black text-white rounded-lg px-3"
                      >
                        <MdEdit color="white" className="w-6 h-6" />
                        Approve
                      </div> */}
                    <div
                      onClick={() => dispatch(deleteProperty(item._id))}
                      className="bg-[#FF1313] cursor-pointer w-full  justify-center h-[40px] rounded-lg flex items-center gap-3 px-3 text-white font-sans"
                    >
                      <FaTrash color="white" className="w-5 h-5" />
                      Unlist
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* PROPERTY DISPLAY SECTION ENDS */}
      </>
    );
  };

  const displayPending = () => {
    return (
      <>
        {/* SEARCH SECTION STARTS HERE */}
        <div className="flex w-full items-start gap-3 mt-10">
          <input
            className="min-w-[440px] h-[45px] rounded-md p-3 appearance-none focus:outline-none border-[1px] border-black/25"
            placeholder="Type Location or Keyword"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="w-max h-[45px] py-1 px-6 text-sm flex items-center justify-center text-white bg-[#FD6602] rounded-md">
            Search
          </div>
        </div>
        {/* SEARCH SECTION STARTS HERE */}

        {/* PROPERTY DISPLAY SECTION STARTS */}
        <div className="w-full lg:flex-wrap flex lg:flex-row flex-col h-max items-center justify-start gap-[4rem] py-10 px-5 lg:px-0">
          {searchResults.length > 0 &&
            searchResults.map((item) => (
              <div key={item._id} className="card1 shadow-md shadow-black/50 ">
                <div className="flex flex-col w-full h-full ">
                  <img
                    src={item.imageLink}
                    className=" h-[200px] w-full object-cover rounded-t-lg"
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

                  <div className="flex items-center justify-between w-full  px-3 gap-5">
                    <div
                      onClick={() => dispatch(editProperty(item._id))}
                      className="flex items-center justify-center cursor-pointer h-[40px] gap-3 w-full bg-black text-white rounded-lg px-3"
                    >
                      <MdEdit color="white" className="w-6 h-6" />
                      Approve
                    </div>
                    <div
                      onClick={() => dispatch(deleteProperty(item._id))}
                      className="bg-[#FF1313] cursor-pointer w-full  justify-center h-[40px] rounded-lg flex items-center gap-3 px-3 text-white font-sans"
                    >
                      <FaTrash color="white" className="w-5 h-5" />
                      Unlist
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* PROPERTY DISPLAY SECTION ENDS */}
      </>
    );
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setPropertyForm({
      ...propertyForm,
      [name]: name === "file" ? files[0] : value,
    });

    if (files) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
    }
  };

  const handlePropertySubmit = (e) => {
    e.preventDefault();
    if (
      !propertyForm.description &&
      !propertyForm.file &&
      !propertyForm.location &&
      !propertyForm.name &&
      !propertyForm.price &&
      !propertyForm.roomNumber &&
      !propertyForm.sqft &&
      !propertyForm.type
    ) {
      alert("Please enter all required fields");
    } else {
      dispatch(createProperty(propertyForm));
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (adminProperty.properties.length > 0) {
      const results = adminProperty?.properties.filter((property) =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  useEffect(() => {
    if (propertySuccess) {
      dispatch(getPendingProperty());
      dispatch(getProperty());
      if (adminProperty) {
        setSearchResults(adminProperty.properties);
      }
      if (property) {
        setSearchResults1(property.properties);
      }
      toast.success(propertyMessage);
      setTimeout(() => {
        dispatch(resetProperty());
      }, 3000);
    }

    if (propertyError) {
      toast.error(propertyMessage);
      setTimeout(() => {
        dispatch(resetProperty());
      }, 3000);
    }
  }, [propertySuccess, propertyError, propertyMessage]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults(adminProperty?.properties);
    }
  }, [searchTerm]);

  useEffect(() => {
    dispatch(getPendingProperty());
    dispatch(getProperty());
    // if (adminProperty) {
    //   return;
    // } else {
    //   dispatch(getPendingProperty());
    // }
  }, []);

  return (
    <div className="flex flex-col w-full px-10 h-screen py-8 overflow-y-auto">
      <ToastContainer position="top-center" hideProgressBar />
      {/* TOP SECTION STARTS HERE */}
      <div className="w-full h-max flex items-end justify-between ">
        <h1 className="text-3xl font-sans font-bold">
          Manage Your <br /> Properties
        </h1>
      </div>
      {/* TOP SECTION ENDS HERE */}

      <div className="flex items-center gap-12 font-sans lg:px-0 px-5 mt-10">
        <p
          className={`${
            display === "approved"
              ? "font-semibold border-b-2 border-[#FD6602] cursor-pointer"
              : "font-normal cursor-pointer"
          }`}
          onClick={() => setDisplay("approved")}
        >
          Approved Properties
        </p>

        <p
          className={`${
            display === "pending"
              ? "font-semibold border-b-2 border-[#FD6602] cursor-pointer"
              : "font-normal cursor-pointer"
          }`}
          onClick={() => setDisplay("pending")}
        >
          Pending Properties
        </p>
      </div>

      {display === "approved" ? displayApproved() : displayPending()}

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

export default AdminProperty;
