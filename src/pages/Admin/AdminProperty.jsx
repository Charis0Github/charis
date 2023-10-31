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
} from "../../Redux/Features/propertySlice";

const AdminProperty = () => {
  const [isOpen, setIsOpen] = useState();
  const [previewImageUrl, setPreviewImageUrl] = useState("");
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

  useEffect(() => {
    if (propertySuccess) {
      dispatch(getProperty());
      setIsOpen(false);
      setTimeout(() => {
        dispatch(resetProperty());
      }, 3000);
    }

    if (propertyError) {
      alert(propertyMessage);
    }
  }, [propertySuccess, propertyError, propertyMessage]);

  useEffect(() => {
    if (adminProperty) {
      return;
    } else {
      dispatch(getPendingProperty());
    }
  }, []);

  return (
    <div className="flex flex-col w-full px-10 h-screen py-8 overflow-y-auto">
      {/* TOP SECTION STARTS HERE */}
      <div className="w-full h-max flex items-end justify-between ">
        <h1 className="text-3xl font-sans font-bold">
          Manage Your <br /> Properties
        </h1>

        <div
          onClick={() => setIsOpen(true)}
          className="w-max px-6 py-2 bg-black text-white font-semibold font-sans flex items-center gap-3 rounded-md"
        >
          <AiOutlinePlus color="white" className="w-6 h-6" />
          <p> Add Properties</p>
        </div>
      </div>
      {/* TOP SECTION ENDS HERE */}

      {/* SEARCH SECTION STARTS HERE */}
      <div className="flex w-full items-start gap-3 mt-10">
        <input
          className="min-w-[440px] h-[45px] rounded-md p-3 appearance-none focus:outline-none border-[1px] border-black/25"
          placeholder="Type Location or Keyword"
        />
        <div
          onClick={() => dispatch(getProperty())}
          className="w-max h-[45px] py-1 px-6 text-sm flex items-center justify-center text-white bg-[#FD6602] rounded-md"
        >
          Search
        </div>
      </div>
      {/* SEARCH SECTION STARTS HERE */}

      {/* PROPERTY DISPLAY SECTION STARTS */}
      <div className="w-full lg:flex-wrap flex lg:flex-row flex-col h-max items-center justify-start gap-[4rem] py-10 px-5 lg:px-0">
        {adminProperty
          ? adminProperty?.properties?.map((item) => (
              <div key={item._id} className="card1 shadow-md shadow-black/50 ">
                <div className="flex flex-col w-full h-full ">
                  <img
                    src={item.imageLink}
                    className=" h-[200px] w-full object-cover rounded-t-lg"
                  />

                  <div className="w-full  p-3 rounded-b-lg flex flex-col gap-5 py-2 mb-2">
                    <h1 className="w-full text-2xl font-semibold h-[70px]">
                      {item.name} ({item.type})
                    </h1>
                    <h1 className="w-full text-lg font-medium text-[#FD6602]">
                      Price:
                      <span className="text-lg font-medium text-black">
                        N{formatNumber(item.price)}
                      </span>
                    </h1>
                    <p className="w-full text-ellipsis h-[60px] overflow-y-auto">
                      {item.description}
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

                  <div className="flex items-center justify-between w-full  px-3 gap-5">
                    <div
                      // onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center h-[40px] gap-3 w-full bg-black text-white rounded-lg px-3"
                    >
                      <MdEdit color="white" className="w-6 h-6" />
                      Approve
                    </div>
                    <div
                      onClick={() => dispatch(deleteProperty(item._id))}
                      className="bg-[#FF1313] cursor-pointer w-full justify-center h-[40px] rounded-lg flex items-center gap-3 px-3 text-white font-sans"
                    >
                      <FaTrash color="white" className="w-5 h-5" />
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      {/* PROPERTY DISPLAY SECTION ENDS */}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white lg:p-8 p-4 rounded-lg h-[95%] w-[500px] relative overflow-y-auto">
            <h1 className="text-left lg:text-2xl text-lg mb-10">
              Create Property
            </h1>

            <div
              onClick={() => setIsOpen(false)}
              className="absolute top-3 flex items-center justify-center lg:right-5 right-2 h-[20px] w-[20px] rounded-full p-1 bg-black text-white cursor-pointer"
            >
              <h1 className="text-xs font-bold">X</h1>
            </div>

            <form
              onSubmit={handlePropertySubmit}
              className="flex flex-col w-full gap-7"
            >
              <Input
                type={"text"}
                name={"name"}
                placeholder={"Type in name of Property"}
                label={"Name"}
                value={propertyForm.name}
                onChange={handleChange}
              />
              <Input
                type={"text"}
                name={"price"}
                placeholder={"Type in price of Property E.g 200000000"}
                label={"Price"}
                value={propertyForm.price}
                onChange={handleChange}
              />

              <Input
                type={"text"}
                name={"type"}
                placeholder={"Type of Property E.g Duplex"}
                label={"Type"}
                value={propertyForm.type}
                onChange={handleChange}
              />
              <Input
                type={"text"}
                name={"description"}
                placeholder={"Type in a short description of the property"}
                label={"Description"}
                value={propertyForm.description}
                onChange={handleChange}
              />

              <Input
                type={"text"}
                name={"location"}
                placeholder={"Type location of property"}
                label={"Location"}
                value={propertyForm.location}
                onChange={handleChange}
              />

              <Input
                type={"text"}
                name={"sqft"}
                placeholder={"Type in Dimension of Property (sqft)"}
                label={"Dimension"}
                value={propertyForm.sqft}
                onChange={handleChange}
              />

              <Input
                type={"text"}
                name={"roomNumber"}
                placeholder={"Type in number of bedrooms"}
                label={"Bedroom"}
                value={propertyForm.roomNumber}
                onChange={handleChange}
              />

              <div>
                <h1 className="text-base font-semibold font-sans">Media</h1>
                <p className="text-sm font-extralight">
                  Upload picture of your logo (5mb max)
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-lg  justify-end relative p-2 bg-[#FF6700] w-max">
                    <img src={add} className="w-5 h-5" />
                    <label htmlFor="file" className="text-white">
                      Upload picture
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={handleChange}
                      name="file"
                      className="absolute opacity-0 cursor-pointer p-2 appearance-none "
                    />
                    {/* <p className='absolute left-[8.5rem] w-full'>{file ? file.name : null}</p> */}
                  </div>

                  <img
                    src={previewImageUrl ? previewImageUrl : null}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-max px-5 py-1 bg-black flex items-center justify-center text-white font-sans rounded-lg"
              >
                {propertyLoading ? "creating property" : "Add property"}
              </button>
            </form>
          </div>
        </div>
      )}

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
