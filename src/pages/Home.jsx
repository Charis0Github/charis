import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import hero from "../assets/hero.png";
import con1 from "../assets/con1.svg";
import con2 from "../assets/con2.svg";
import con3 from "../assets/con3.svg";
import con4 from "../assets/con4.svg";
import slider1 from "../assets/carousel-images/carousel-image1.jpg";
import slider2 from "../assets/carousel-images/carousel-image2.jpg";
import slider3 from "../assets/carousel-images/carousel-image3.jpg";
import slider4 from "../assets/carousel-images/carousel-image4.jpg";
import slider5 from "../assets/carousel-images/carousel-image5.jpg";
import slider6 from "../assets/carousel-images/carousel-image6.jpg";
import slider7 from "../assets/carousel-images/carousel-image7.jpg";
import slider8 from "../assets/carousel-images/carousel-image8.jpg";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
import p1 from "../assets/p1.png";
import p2 from "../assets/par1.jpeg";
import p3 from "../assets/pt1.jpeg";
import p4 from "../assets/pt2.jpeg";
import p5 from "../assets/pt3.jpeg";
// import p6 from "../assets/pt4.jpeg";
import p7 from "../assets/par2.jpeg";
import p8 from "../assets/par3.jpeg";
import p9 from "../assets/par4.jpeg";
import prop1 from "../assets/prop1.png";
import prop2 from "../assets/prop2.png";
import prop3 from "../assets/prop3.png";
import prop4 from "../assets/prop4.png";
import Input from "../components/Input";
import add from "../assets/add.svg";
import profile from "../assets/user.svg";
import arr from "../assets/dwnArr.svg";
import { Form1, Form2, Form3, Form4 } from "./Forms/Forms";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { createProperty, resetProperty } from "../Redux/Features/propertySlice";
import { resetPaymentMini } from "../Redux/Features/paymentSlice";
// import { resetPayment } from "../Redux/Features/paymentSlice";
// import { resetFormData } from "../Redux/Features/formSlice";

const Home = () => {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState(0);
  const [prompt, setPrompt] = useState(false);
  const [prompt1, setPrompt1] = useState(false);
  // const [file, setFile] = useState(null);
  const [menu, setMenu] = useState(false);
  const [errorHandle, setErrorHandle] = useState(false);

  const navigate = useNavigate();
  const { user, userDetails } = useSelector((state) => state.auth);
  // console.log({ user, userDetails });
  const { paymentStatus, paymentSuccess } = useSelector(
    (state) => state.payment
  );
  const {
    property,
    propertySuccess,
    propertyLoading,
    propertyError,
    propertyMessage,
  } = useSelector((state) => state.property);

  const [isListing, setIsListing] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [propertyForm, setPropertyForm] = useState({
    price: "",
    description: "",
    location: "",
    buildingFloorArea: "",
    plotSize: "",
    roomNumber: "",
    type: "",
    name: "",
    file: "",
  });

  const {
    price,
    description,
    location,
    buildingFloorArea,
    plotSize,
    roomNumber,
    type,
    name,
    file,
  } = propertyForm;

  const tabs = [
    { id: 1, text: "Get house allocation" },
    { id: 2, text: "Get a loan" },
    { id: 3, text: "Get annual ROI" },
    { id: 4, text: "Shop online" },
  ];

  const handleClick = (id, index) => {
    setActive(index);
    console.log(id);
  };

  const handleAffiliate = () => {
    if (userDetails.userData.affiliateUserName) {
      navigate("/affiliate/dashboard");
      setMenu(!menu);
    } else {
      navigate("/affiliate");
    }
  };

  const formatNumberWithCommas = (input) => {
    // Convert the input string to a number
    const number = parseFloat(input.replace(/,/g, ""));

    // Check if the conversion is successful and it's a valid number
    if (!isNaN(number)) {
      // Use Number.toLocaleString() to format the number with commas
      return number.toLocaleString();
    } else {
      // If the conversion fails, return the original input
      return input;
    }
  };

  const handlePropertyChange = (event) => {
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

  //NEW PROPERTY SUBMIT HANDLER
  const handlePropertySubmit = (e) => {
    e.preventDefault();
    if (
      !propertyForm.description &&
      !propertyForm.file &&
      !propertyForm.location &&
      !propertyForm.name &&
      !propertyForm.price &&
      !propertyForm.roomNumber &&
      !propertyForm.buildingFloorArea &&
      !propertyForm.plotSize &&
      !propertyForm.type
    ) {
      alert("Please enter all required fields");
    } else {
      const body = {
        price: price.replace(/[^0-9]/g, ""),
        description,
        location,
        buildingFloorArea,
        plotSize,
        roomNumber,
        type,
        name,
        file,
      };
      // console.log(JSON.stringify(body));
      dispatch(createProperty(body));
    }
  };

  const handleHomeOwnership = () => {
    if (userDetails.userData.status === "not-paid") {
      setIsOpen(true);
    } else {
      setPrompt(true);
    }
  };

  const dispatch = useDispatch();

  const close = () => {
    setIsOpen(false);
  };

  const setter = () => {
    setErrorHandle(true);
  };

  function formatNumber(number) {
    // Check if the input is a valid number
    // if (isNaN(number)) {
    //   return "Invalid Number";
    // }

    // Convert the number to a string
    const numberString = number.toString();

    // Format the integer part by adding thousands separators
    const formattedIntegerPart = numberString.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    return formattedIntegerPart;
  }

  const handleForm = () => {
    if (user?._id) {
      if (userDetails?.userData?.status === "paid") {
        setMenu(!menu);
        setPrompt(true);
      } else {
        setMenu(!menu);
        setIsOpen(true);
      }
    } else {
      navigate("/login");
    }
  };

  const handleMainDashboard = () => {
    if (user?._id) {
      if (userDetails?.userData?.status === "paid") {
        setMenu(!menu);
        navigate("/dashboard");
      } else {
        setMenu(!menu);
        setPrompt1(true);
      }
    }
  };

  const handleStep = (step) => {
    setSteps(step);
  };

  const renderForm = () => {
    if (steps === 0) {
      return (
        <Form1 close={close} errorHandle={setter} handleStep={handleStep} />
      );
    } else if (steps === 1) {
      return <Form2 errorHandle={setter} handleStep={handleStep} />;
    } else if (steps === 2) {
      return <Form3 errorHandle={setter} handleStep={handleStep} />;
    } else {
      return <Form4 errorHandle={setter} handleStep={handleStep} />;
    }
  };

  const handleGetStarted = () => {
    if (user?._id) {
      setMenu(!menu);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (propertySuccess) {
      toast.success("Property Listed Successfully");
      setIsListing(false);
      dispatch(resetProperty());
    }
    if (propertyError) {
      toast.error(propertyMessage);
      dispatch(resetProperty());
    }
  }, [propertySuccess, propertyError, propertyMessage]);

  useEffect(() => {
    if (paymentSuccess) {
      window.location.href = paymentStatus.response.data.link;
      dispatch(resetPaymentMini());
    }
  }, [paymentSuccess]);

  // useEffect(() => {
  //   dispatch(resetPayment());
  // }, []);

  // const display = () => {
  //   const data = localStorage.getItem("image");
  //   setFile(JSON.stringify(data));
  // };

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetPayment());
  //   };
  // }, []);
  // console.log({ active });
  return (
    <>
      {/* HERO SECTION STARTS */}
      <div className="pt-[5px] lg:px-[70px] px-5 w-full h-full lg:flex items-center justify-center">
        <div className="lg:flex items-center justify-center w-full space-y-3 lg:space-y-0 lg:w-[95%] h-full lg:h-[600px] lg:mt-[1rem]">
          <div className="w-full h-full">
            <h1 className="text-5xl font-semibold lg:mt-[4rem] leading-[4rem] w-full">
              CALGI securely delivers <br /> your{" "}
              <span className="bg-[#FF6700] p-1 rounded-lg text-white">
                needs.
              </span>
            </h1>

            <ul className="list-disc mt-[4rem]">
              <li className="flex items-center gap-3 my-[1rem] text-3xl">
                <span className="w-[14px] h-[14px] bg-black block rounded-[999px]"></span>{" "}
                We help to{" "}
                <span className="bg-[#FF6700] p-1 rounded-lg text-white">
                  buy
                </span>{" "}
                houses
              </li>
              <li className="flex items-center gap-3 my-[1rem] text-3xl">
                <span className="w-[14px] h-[14px] bg-black block rounded-[999px]"></span>{" "}
                We help to{" "}
                <span className="bg-[#FF6700] p-1 rounded-lg text-white">
                  build
                </span>{" "}
                houses
              </li>
              <li className="flex items-center gap-3 my-[1rem] text-3xl">
                <span className="w-[14px] h-[14px] bg-black block rounded-[999px]"></span>{" "}
                We help to{" "}
                <span className="bg-[#FF6700] p-1 rounded-lg text-white">
                  complete
                </span>{" "}
                houses
              </li>
              <li className="flex items-center gap-3 my-[1rem] text-3xl">
                <span className="w-[14px] h-[14px] bg-black block rounded-[999px]"></span>{" "}
                We{" "}
                <span className="bg-[#FF6700] p-1 rounded-lg text-white">
                  facilitate
                </span>{" "}
                loans
              </li>
            </ul>
            <p className="mt-12 lg:w-[90%] text-lg font-extralight text-[#5A5A50] ">
              Access basic necessities at a cheaper rate.
              <br />
              Own your home on a rent to own basis or an outright payment.
              <br />
              Earn dividends when you invest into the co-operative.
              <br />
              Access loans at
              <span className="text-[#FF6700]"> 5% interest rate.</span>
            </p>

            <div className=" relative flex items-center  gap-5 lg:w-max w-[300px]  mt-12 flex-wrap">
              <button
                onClick={handleGetStarted}
                // onClick={handleHomeOwnership}
                className={`items-center space-x-3 justify-center text-xl bg-black py-2 px-4 rounded-md w-[220px] font-bold text-white ${
                  user?._id ? "hidden lg:flex" : null
                }`}
              >
                <p className="font-bold text-lg text-center">Get Started</p>
              </button>

              {user?._id && (
                <div
                  onClick={handleGetStarted}
                  className={`relative ${
                    user?._id ? "lg:hidden" : null
                  } flex items-center justify-between p-2 px-4 lg:py-3 rounded-lg space-x-2 w-[220px] h-full text-white text-sm bg-[#FF6700] cursor-pointer`}
                >
                  <img width={15} height={15} src={profile} alt="user icon" />
                  <p>{user?._id ? userDetails?.userData?.name : "Username"}</p>
                  <img
                    width={20}
                    height={20}
                    src={arr}
                    alt="drop down arrow icon"
                  />
                </div>
              )}

              {menu && (
                <ul className="absolute top-[64px] flex flex-col gap-4 items-start justify-start left-0 h-max py-4 px-4 w-[180px] bg-[#000000] z-30 rounded-md text-white">
                  {userDetails?.userData?.status === "paid" && (
                    <li
                      onClick={handleMainDashboard}
                      className="text-sm p-2 cursor-pointer hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                    >
                      {/* <img width={15} height={15} src={profile} alt="user icon" /> */}
                      Main Dashboard
                    </li>
                  )}

                  {userDetails?.userData?.status === "not-paid" && (
                    <li
                      onClick={handleForm}
                      className="text-sm p-2 cursor-pointer hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                    >
                      {/* <img width={15} height={15} src={profile} alt="user icon" /> */}
                      Become a Member
                    </li>
                  )}

                  <li
                    onClick={handleAffiliate}
                    className="text-sm p-2 cursor-pointer hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                  >
                    {/* <img width={15} height={15} src={profile} alt="user icon" /> */}
                    {userDetails.userData?.affiliateUserName
                      ? "Affiliate Dashboard"
                      : " Become an affiliate"}
                  </li>

                  <li
                    onClick={() => {
                      setMenu(!menu);
                      setIsListing(true);
                    }}
                    className="text-sm p-2 cursor pointer hover:bg-[#FF6700] w-full px-2 flex items-center justify-start gap-3"
                  >
                    {/* <img width={15} height={15} src={profile} alt="user icon" /> */}
                    List Property
                  </li>
                </ul>
              )}

              {/* <div
                onClick={handleAffiliate}
                className="text-black bg-white border-[1px] border-black w-auto join p-2 rounded-lg text-sm px-6 py-3 font-bold cursor-pointer"
              >
                Become an affiliate
              </div>

              <div
                onClick={() => setIsListing(true)}
                className="text-black bg-white border-[1px] border-black w-auto join p-2 rounded-lg text-sm px-6 py-3 font-bold cursor-pointer"
              >
                List Property
              </div> */}
            </div>
          </div>

          <div className="w-full h-full">
            <iframe
              width="660"
              height="320"
              src="https://www.youtube.com/embed/u6iNY3rEzMU?si=92ZKS6_uNAQqiTjo&amp;controls=0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              className="hero-vid mt-10"
            ></iframe>
            {/* <img
              src={hero}
              loading="lazy"
              className="w-full h-full lg:h-full rounded-lg"
            /> */}
          </div>
        </div>
      </div>
      {/* HERO SECTION ENDS */}
      {/* SERVICE SECTION STARTS */}
      <div className="grid lg:px-[70px] px-5 py-5  w-full h-auto lg:h-max service -mt-[5rem]">
        <div className="w-full h-full flex flex-col lg:py-32 items-center lg:pt-0 pt-28 justify-start">
          <div className="flex lg:mt-36  flex-wrap justify-center lg:justify-start items-center w-full text-left lg:space-x-28 space-x-5 text-[#ffffff68] cursor-pointer">
            {tabs.map((tab, index) => (
              <p
                className={
                  active === index
                    ? "text-[#FD6602] p-2 relative inline-block font-extrabold"
                    : "p-2 relative inline-block"
                }
                onClick={() => handleClick(tab.id, index)}
                key={index}
              >
                {tab.text}
                <span
                  className={
                    active === index
                      ? "absolute block bottom-0 w-[92%] h-[2px] bg-white"
                      : "hidden"
                  }
                ></span>
              </p>
            ))}
          </div>

          {active === 3 && (
            <div className="lg:flex items-center w-full lg:gap-12 space-y-[2rem] lg:space-y-0">
              <div className="lg:flex flex-col w-full items-center justify-center mt-16">
                <img src="./calgint.webp" alt="" className="w-80" />
                <h1 className="text-lime-50 text-2xl font-extrabold leading-[4rem] text-center">
                  Calgint
                </h1>
                <h1 className="text-lime-50  font-semibold leading-[2rem] text-center">
                  Shop products for best prices at your convenience.
                </h1>
              </div>
            </div>
          )}
          {active !== 3 && (
            <div className="lg:flex items-center w-full lg:gap-12 space-y-[2rem] lg:space-y-0">
              <div className="py-app-5rem lg:h-[18rem] h-auto p-3 lg:w-full w-full py-[5rem] lg:py-0 flex flex-col items-center justify-center text-center">
                <p className="mb-2 text-white text-sm animate-journey">
                  Create An account <br /> Today
                </p>
                <div
                  className={
                    "circle w-[70px] h-[70px] rounded-full border-4 border-[#929292] flex items-center justify-center  cursor-pointer hover:bg-[#FD6602]" +
                    (user?._id ? " bg-[#FD6602]" : "")
                  }
                >
                  <p className="text-white text-sm font-semibold text-center">
                    Step 1
                  </p>
                </div>
              </div>

              <div className="py-app-5rem lg:h-[18rem] h-auto p-3 lg:w-full w-full py-[5rem] lg:py-0 flex flex-col items-center justify-center text-center">
                {active === 0 && (
                  <p className="mb-2 text-white text-sm animate-journey">
                    Join The Housing <br /> Co-Operative.
                  </p>
                )}
                {active === 1 && (
                  <p className="mb-2 text-white text-sm animate-journey">
                    Join The Housing <br /> Co-Operative.
                  </p>
                )}
                {active === 2 && (
                  <p className="mb-2 text-white text-sm animate-journey">
                    Join The Housing <br /> Co-Operative.
                  </p>
                )}

                <div
                  // onClick={() => {
                  //   console.log(userDetails?.userData);
                  // }}
                  className={
                    "circle w-[70px] h-[70px] rounded-full border-4 border-[#929292] flex items-center justify-center  cursor-pointer hover:bg-[#FD6602]" +
                    (userDetails?.userData?.status !== "not-paid"
                      ? " bg-[#FD6602]"
                      : "")
                  }
                >
                  <p className="text-white text-sm font-semibold text-center">
                    Step 2
                  </p>
                </div>
              </div>

              <div className="py-app-5rem lg:h-[18rem] h-auto p-3 lg:w-full w-full py-[5rem] lg:py-0 flex flex-col items-center justify-center">
                {active === 0 && (
                  <p className="mb-2 text-white text-sm animate-journey">
                    Apply For House <br /> Of Your Choice
                  </p>
                )}
                {active === 1 && (
                  <p className="mb-2 text-white text-sm animate-journey lg:h-10">
                    Apply For Loan.
                  </p>
                )}
                {active === 2 && (
                  <p className="mb-2 text-white text-sm animate-journey lg:h-10">
                    Buy Share Capital.
                  </p>
                )}

                <div className="circle w-[70px] h-[70px] rounded-full border-4 border-[#929292] bg-transparent flex items-center justify-center  cursor-pointer hover:bg-[#FD6602]">
                  <p className="text-white text-sm font-semibold text-center">
                    Step 3
                  </p>
                </div>
              </div>

              <div className="py-app-5rem lg:h-[18rem] h-auto p-3 lg:w-full w-full py-[5rem] lg:py-0 flex flex-col items-center justify-center text-center">
                {active === 0 && (
                  <p className="mb-2 text-white text-sm animate-journey">
                    Get House <br /> Allocation
                  </p>
                )}
                {active === 1 && (
                  <p className="mb-2 text-white text-sm animate-journey">
                    Get
                    <br /> Approval.
                  </p>
                )}
                {active === 2 && (
                  <p className="mb-2 text-white text-sm animate-journey lg:h-10">
                    Review Status.
                  </p>
                )}

                <div className="circle w-[70px] h-[70px] rounded-full border-4 border-[#929292] flex items-center justify-center cursor-pointer hover:bg-[#FD6602]">
                  <p className="text-white text-sm font-semibold text-center">
                    Step 4
                  </p>
                </div>
              </div>

              <div className="py-app-5rem lg:h-[18rem] h-auto p-3 lg:w-full w-full py-[5rem] lg:py-0 flex flex-col items-center justify-center text-center">
                {active === 0 && (
                  <p className="mb-2 text-white text-sm animate-journey">
                    Take Full Possession
                    <br />
                    Of The Property
                  </p>
                )}
                {active === 1 && (
                  <p className="mb-2 text-white text-sm animate-journey lg:h-10">
                    Access Loan.
                  </p>
                )}
                {active === 2 && (
                  <p className="mb-2 text-white text-sm animate-journey lg:h-10">
                    Get Earnings.
                  </p>
                )}

                {active !== 3 && (
                  <div className="w-[70px] h-[70px] rounded-full border-4 border-[#929292] flex items-center justify-center cursor-pointer hover:bg-[#FD6602]">
                    <p className="text-white text-sm font-semibold text-center">
                      Step 5
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {active !== 3 && (
            <div
              onClick={handleForm}
              className="flex items-center lg:justify-start justify-center w-full mt-3 lg:pl-20 "
            >
              <h1 className="text-black bg-white join p-2 rounded-lg text-sm px-6 py-3 font-bold cursor-pointer">
                Join co-operative
              </h1>
            </div>
          )}
          {active === 3 && (
            <div
              onClick={() => {
                window.location.href = "https://www.calgint.com";
              }}
              className="flex items-center lg:justify-start justify-center w-full mt-3 lg:pl-20 "
            >
              <h1 className="text-black bg-white join p-2 rounded-lg text-sm px-6 py-3 font-bold cursor-pointer">
                Start Shopping Now!
              </h1>
            </div>
          )}
          <h1 className="text-3xl font-extrabold text-white text-center mt-[5rem]">
            Our Services
          </h1>
          <div className="flex flex-col lg:flex  w-full leading-10 lg:leading-none lg:flex-row  items-center justify-center lg:items-center lg:justify-center lg:space-x-20 lg:mt-[3rem] mt-6">
            <li className="list-disc text-white">Home Ownership</li>
            <li className="list-disc text-white">Loan Facilities </li>
            <li className="list-disc text-white">Investment Opportunities</li>
            <li className="list-disc text-white">Online Shopping</li>
          </div>
        </div>
      </div>
      {/* SERVICE SECTION ENDS */}

      <div
        style={{ marginLeft: "calc(50% - 400px)" }}
        className="splide-on-mobile"
      >
        <Splide
          options={{
            rewind: true,
            type: "loop",
            width: 800,
            gap: "1rem",
            autoplay: true,
            interval: "1000",
          }}
          aria-label="My Favorite Images"
        >
          <SplideSlide>
            <img src={slider1} alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src={slider2} alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src={slider3} alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src={slider4} alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src={slider5} alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src={slider6} alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src={slider7} alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src={slider8} alt="Image 1" />
          </SplideSlide>
        </Splide>
      </div>
      {/* PARTNERS SECTION STARTS */}
      <h1
        // onClick={display}
        className="text-3xl font-extrabold text-black text-center mt-[7rem]"
      >
        Our Partners
        {/* {file && file} */}
      </h1>

      <div className="images lg:flex items-center justify-center w-full flex flex-col lg:flex-wrap  lg:space-x-5 lg:mt-[3rem] mt-20 space-y-5 lg:space-y-5 lg:mb-[10rem]">
        <div className="w-max lg:flex lg:flex-row items-center mb-7 flex flex-col gap-5">
          <img src={p1} width={200} height={200} />
          <img src={p2} width={200} height={200} />
          <img src={p3} width={200} height={200} />
          <img src={p4} width={200} height={200} />
        </div>

        <div className="w-max lg:flex lg:flex-row items-center mb-7 flex flex-col gap-5">
          <img src={p5} width={200} height={200} />
          <img src={p7} width={200} height={200} />
          <img src={p8} width={200} height={200} />
          <img src={p9} width={200} height={200} />
        </div>
      </div>
      {/* PARTNERS SECTION ENDS */}

      {/* NEWSLETTER SECTION STARTS */}
      <div className="w-full flex flex-col lg:flex-row lg:flex mb-[10rem] items-center h-max lg:h-[600px] news">
        {/* CHOOSE US SECTION BEGINS */}
        <div className="w-full h-full lg:flex lg:flex-col lg:px-[6rem] px-5 lg:pt-[5rem] pb-[4rem] lg:pb-0">
          <h1 className="text-black text-2xl mt-10 lg:mt-0 lg:text-3xl text-lef font-bold">
            Why Choose Us
          </h1>
          <p className="leading-10 mt-5">
            1. Guaranteed home ownership in 12months period.
            <br />
            2. Affordable Homes.
            <br />
            3. Flexible and convenient monthly payment to match customer’s
            income.
            <br />
            4. Annual return on investment.
            <br />
            5. Guaranteed home payment support incase of death or loss of
            income.
            <br />
            6. 12 months money back if dis-satisfied with service delivery.
            <br />
          </p>

          {/* <button className="flex items-center space-x-3 justify-between mt-8 mb-16 lg:mb-0 text-lg bg-black py-2 px-4 lg:px-6  lg:py-3 rounded-md w-max font-bold text-white">
            <p className="font-bold text-sm">Activate</p>
          </button> */}
        </div>
        {/* CHOOSE US SECTION ENDS */}

        {/* SUBCRIBE SECTION STARTS */}
        <div className="w-full h-full flex flex-col lg:px-[10rem] px-5 space-y-8 mb-20 lg:mb-0 lg:pl-[rem] lg:space-y-7 lg:flex lg:flex-col items-start justify-start lg:justify-center">
          <h1 className="text-white text-2xl mt-1 lg:mt-0 lg:text-3xl text-left">
            Subscribe to News Letter
          </h1>

          <div className="w-full mt-20">
            <label htmlFor="fullname" className="text-sm text-white">
              Full name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              autoComplete="text"
              className="relative block w-full appearance-none bg-transparent rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-[#ffffff7e] placeholder-[#ffffff7e] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
              placeholder="Enter Full name..."
            />
          </div>

          <div className="w-full mt-10">
            <label htmlFor="phone" className="text-sm text-white">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="number"
              autoComplete="phone"
              className="relative block w-full appearance-none bg-transparent rounded-lg border border-[#D9D9D9] mb-[20px] px-3 py-3 text-[#ffffff7e] placeholder-[#ffffff7e] focus:border-[#D9D9D9] focus:outline-none sm:text-sm"
              placeholder="Enter phone number"
            />
          </div>

          <button className="flex items-center space-x-3 justify-between mt-12 text-lg bg-[#FD6602] py-2 px-4 lg:px-6  lg:py-3 rounded-md w-auto font-bold text-white">
            <p className="font-bold text-sm">Submit</p>
          </button>
        </div>
        {/* SUBCRIBE SECTION ENDS */}
      </div>
      {/* NEWSLETTER SECTION ENDS */}

      {/* PROPERTY LINK SECTION STARTS HERE */}
      <div className="w-full  h-max lg:h-[500px] lg:px-[70px] mb-[10rem]">
        <div className="w-full h-full flex flex-col gap-10 lg:gap-2 lg:flex-row lg:flex  bg-[#FF6700] items-center lg:px-[100px] px-5 py-10">
          {/* LEFT IMAGES AREA STARTS */}
          <div className="lg:w-[500px]  w-full h-full flex items-center justify-center gap-5">
            <div className="w-full h-full flex flex-col items-center justify-center gap-5">
              <img src={prop1} width={200} height="100%" />
              <img src={prop2} width={200} height={200} />
            </div>

            <div className="w-full h-full flex flex-col items-center justify-center gap-5">
              <img src={prop3} width={200} height={200} />
              <img src={prop4} width={200} height={200} />
            </div>
          </div>
          {/* LEFT IMAGES AREA ENDS */}

          {/* RIGHT TEXT AREA */}
          <div className="w-full h-full flex flex-col items-start justify-center gap-10 lg:px-[70px] px-5">
            <h1 className="lg:text-5xl text-4xl font-bold">
              View our Property Listings
            </h1>
            <p className="text-white font-lg">
              Explore a variety of top-notch properties tailored to your
              preferences. From cozy homes to elegant apartments and spacious
              estates, our curated listings offer something for everyone. Begin
              your search for the perfect property today.
            </p>

            <button className="flex items-center space-x-3 justify-between mt-8 text-lg bg-black py-2 px-4 lg:px-6  lg:py-2 rounded-md w-auto font-bold text-white">
              <Link to="/property" className="font-bold text-sm">
                View Properties
              </Link>
            </button>
          </div>
        </div>
      </div>
      {/* PROPERTY LINK SECTION ENDS HERE */}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white lg:p-8 p-4 rounded-lg h-[95%] w-[500px] relative overflow-y-auto">
            <h1 className="text-center lg:text-2xl text-lg">
              Home Ownership Co-operative <br /> Membership Registration Form
            </h1>

            <div
              onClick={() => setIsOpen(false)}
              className="absolute top-3 flex items-center justify-center lg:right-5 right-2 h-[20px] w-[20px] rounded-full p-1 bg-black text-white cursor-pointer"
            >
              <h1 className="text-xs font-bold">X</h1>
            </div>

            <div className="w-full h-max flex flex-col items-start gap-5 mb-10 mt-10">
              {renderForm()}
            </div>
          </div>
        </div>
      )}

      {isListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white lg:p-8 p-4 rounded-lg h-[95%] w-[500px] relative overflow-y-auto">
            <h1 className="text-left lg:text-2xl text-lg mb-10">
              Create Property
            </h1>

            <div
              onClick={() => setIsListing(false)}
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
                onChange={handlePropertyChange}
              />
              <Input
                type={"text"}
                name={"price"}
                placeholder={"Type in price of Property E.g 200000000"}
                label={"Price"}
                value={formatNumberWithCommas(propertyForm.price)}
                onChange={handlePropertyChange}
              />

              <Input
                type={"text"}
                name={"type"}
                placeholder={"Type of Property E.g Duplex"}
                label={"Type"}
                value={propertyForm.type}
                onChange={handlePropertyChange}
              />
              <Input
                type={"text"}
                name={"description"}
                placeholder={"Type in a short description of the property"}
                label={"Description"}
                value={propertyForm.description}
                onChange={handlePropertyChange}
              />

              <Input
                type={"text"}
                name={"location"}
                placeholder={"Type location of property"}
                label={"Location"}
                value={propertyForm.location}
                onChange={handlePropertyChange}
              />

              <Input
                type={"text"}
                name={"buildingFloorArea"}
                label={"Building Floor Area (sqm)"}
                value={propertyForm.buildingFloorArea}
                onChange={handlePropertyChange}
              />

              <Input
                type={"text"}
                name={"plotSize"}
                label={"Plot Size (sqm)"}
                value={propertyForm.plotSize}
                onChange={handlePropertyChange}
              />

              <Input
                type={"text"}
                name={"roomNumber"}
                placeholder={"Type in number of bedrooms"}
                label={"Bedroom"}
                value={propertyForm.roomNumber}
                onChange={handlePropertyChange}
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
                      onChange={handlePropertyChange}
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
                {propertyLoading ? "creating property..." : "Add property"}
              </button>
            </form>
          </div>
        </div>
      )}

      {prompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white flex flex-col gap-16 font-sans items-center lg:p-8 p-4 rounded-lg h-[40%] w-[500px] relative ">
            <div
              onClick={() => setPrompt(false)}
              className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
            >
              <h1 className="text-sm font-bold">X</h1>
            </div>
            <h1 className="text-2xl font-semibold font-sans text-[rgb(253,102,2)]">
              Already Regitered
            </h1>

            <p className="text-center text-lg">
              You are already an active member
            </p>
          </div>
        </div>
      )}

      {errorHandle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white flex flex-col gap-16 font-sans items-center lg:p-8 p-4 rounded-lg h-[30%] w-[300px] relative ">
            <div
              onClick={() => setErrorHandle(false)}
              className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
            >
              <h1 className="text-sm font-bold">X</h1>
            </div>
            <h1 className="text-2xl font-semibold font-sans text-[rgb(253,102,2)]">
              Empty Fields
            </h1>

            <p className="text-center text-lg">
              Please fill all required fields
            </p>
          </div>
        </div>
      )}

      {prompt1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
          <div className="bg-white flex flex-col gap-16 font-sans items-center lg:p-8 p-4 rounded-lg h-[40%] w-[500px] relative ">
            <div
              onClick={() => setPrompt1(false)}
              className="absolute -top-3 flex items-center justify-center lg:-right-2 right-2 h-[30px] w-[30px] rounded-full p-1 bg-black text-white cursor-pointer"
            >
              <h1 className="text-sm font-bold">X</h1>
            </div>
            <h1 className="text-2xl font-semibold font-sans text-[rgb(253,102,2)]">
              Not Eligible
            </h1>

            <p className="text-center text-lg">
              You are not an active member yet! Please complete the membership
              registration process by clicking on
              <span
                className="bg-[rgb(253,102,2)] text-white p-1 rounded-md mx-1 cursor-pointer"
                onClick={() => {
                  setIsOpen(true);
                  setPrompt1(false);
                }}
              >
                "Become a Member"
              </span>
              to get started.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
