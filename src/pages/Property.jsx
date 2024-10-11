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
import { toast } from "react-hot-toast";
import NavbarMinimal from "../components/minimal-Navbar";
import Footer from "../components/Footer";

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

  // const handleSearch = (e) => {
  //   const term = e.target.value;
  //   setSearchTerm(term);
  //   if (property) {
  //     const results = property?.properties.filter((property) =>
  //       property.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setSearchResults(results);
  //   }
  // };

  // useEffect(() => {
  //   if (propertySuccess) {
  //     toast.success("Property Retrieved Successfully");
  //     // setIsListing(false);
  //     dispatch(resetProperty());
  //     setNewProperty(property);
  //   }
  //   if (propertyError) {
  //     toast.error(propertyMessage);
  //     dispatch(resetProperty());
  //   }
  // }, [propertySuccess, propertyError, propertyMessage]);

  // useEffect(() => {
  //   if (searchTerm === "") {
  //     setSearchResults(property?.properties);
  //   }
  // }, [searchTerm]);

  // useEffect(() => {
  //   dispatch(getProperty());
  //   if (property) {
  //     setSearchResults(property?.properties);
  //   } else {
  //     dispatch(getProperty());
  //   }
  // }, []);

  return (
    <div className="w-full min-h-screen h-full">
      <div className="property-hero">
        <NavbarMinimal />
        <div className="ml-8 lg:ml-[5rem]">
          <h1 className="text-5xl lg:text-7xl font-semibold mt-16 lg:mt-32 text-blue-50">
            Find Your Dream <br className="hidden lg:block" /> House
          </h1>
          <p className="text-[#FF6700] text-sm lg:text-xl  mt-2">
            Our catalogue will suprice you, search an unprecented list
            <br /> of luxurious houses that fits your taste and budget.
          </p>
        </div>
        <div className="property-cat rounded-md gap-3 lg:rounded-[120px]">
          {[
            { icon: "house-icons/duplex.svg", name: "Duplex" },
            { icon: "house-icons/blockofflat.svg", name: "Flats" },
            { icon: "house-icons/detached.svg", name: "Detached" },
            { icon: "house-icons/terraced.svg", name: "Terraced" },
            { icon: "house-icons/semi-detached.svg", name: "Semi..." },
            { icon: "house-icons/mansions.svg", name: "Mansions" },
            { icon: "house-icons/condominium.svg", name: "Condom..." },
            { icon: "house-icons/masionettes.svg", name: "Masione..." },
          ].map((cat) => (
            <div className="hover:shadow-lg">
              <img src={cat.icon} alt="" />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div class="container grid grid-cols-1 lg:grid-cols-4 lg:gap-5 mx-auto px-4 mt-[12rem] lg:mt-[4rem]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2].map(
          () => (
            <div class="card bg-gray-800 rounded shadow-md">
              <a href="list-property/:id">
                <img
                  src="https://images.propertypro.ng/large/exclusive-4-bedrooms-duplex-with-2bedroom-bungalow-O6sjXggTKHU5CwNoyYnG.jpg"
                  class="w-full min-h-[12rem] h-auto object-cover"
                  alt="..."
                />
                <div class="card-body px-4 py-6">
                  <div class="text-section">
                    <h5 class="card-title text-xl font-bold text-white">
                      Detached Apartment for sale
                    </h5>
                    <p class="card-text text-gray-300">
                      Some quick example text to build on the card's content.
                    </p>
                  </div>
                  <div class="cta-section flex justify-between items-center">
                    <div class="text-xl font-bold text-white">₦ 247m</div>
                    <a
                      href="#"
                      class="btn px-4 py-2 text-white bg-[#ff6700] hover:bg-gray-700 rounded"
                    >
                      Contact Seller
                    </a>
                  </div>
                </div>
              </a>
            </div>
          )
        )}
      </div>

      {/* TITLE AND SEARCH BAR SECTION STARTS */}

      <div className="flex items-center p-7 mt-[0rem]  justify-center gap-7 max-sm:flex-col">
        {/* <img src="./houses/3.webp" alt="" className="w-[360px] rounded" /> */}
        <img src="./houses/1.webp" alt="" className="w-[360px] rounded" />
        <img src="./houses/2.webp" alt="" className="w-[360px] rounded" />
        {/* <img src="./houses/4.webp" alt="" className="w-[360px] rounded" /> */}
        <div className="flex flex-col items-start justify-center gap-1">
          <h1 className="text-4xl font-semibold">Buy Elegant</h1>
          <h1 className="text-4xl font-semibold">Apartments</h1>
          <span className="text-[#FF6700] text-xl">Charis LGI</span>
          <span className="text-[#FF6700] text-xl">As low as ₦15,000,000</span>
          <p>Spacious sunny apartments</p>
          <p>82 M2, 2bedrooms, 2 bathrooms </p>
          <p className="mt-5">
            Some things are meant together: <br />
            Macaroni and cheese, pam beesly and jim
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Property;
