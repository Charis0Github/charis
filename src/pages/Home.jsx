import React, { useEffect, useState } from "react";
import hero from "../assets/hero.png";
import con1 from "../assets/con1.svg";
import con2 from "../assets/con2.svg";
import con3 from "../assets/con3.svg";
import con4 from "../assets/con4.svg";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import p4 from "../assets/p4.png";
import p5 from "../assets/p5.png";
import p6 from "../assets/p6.png";
import prop1 from "../assets/prop1.png";
import prop2 from "../assets/prop2.png";
import prop3 from "../assets/prop3.png";
import prop4 from "../assets/prop4.png";
import Input from "../components/Input";
import { Form1, Form2, Form3, Form4 } from "./Forms/Forms";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPayment } from "../Redux/Features/paymentSlice";
import { resetFormData } from "../Redux/Features/formSlice";

const Home = () => {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState(0);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const { user, userDetails } = useSelector((state) => state.auth);
  const { paymentStatus } = useSelector((state) => state.payment);

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
    } else {
      navigate("/affiliate");
    }
  };

  const dispatch = useDispatch();

  const close = () => {
    setIsOpen(false);
  };

  const handleForm = () => {
    if (user) {
      if (userDetails?.userData?.status === "paid") {
        alert("You've made payment already");
      } else {
        setIsOpen(true);
      }
    } else {
      navigate("/login");
    }
  };

  const handleStep = (step) => {
    setSteps(step);
  };

  const renderForm = () => {
    if (steps === 0) {
      return <Form1 close={close} handleStep={handleStep} />;
    } else if (steps === 1) {
      return <Form2 handleStep={handleStep} />;
    } else if (steps === 2) {
      return <Form3 handleStep={handleStep} />;
    } else {
      return <Form4 handleStep={handleStep} />;
    }
  };

  useEffect(() => {
    if (paymentStatus) {
      window.location.href = paymentStatus.response.data.link;
    }
  }, [paymentStatus]);

  // const display = () => {
  //   const data = localStorage.getItem("image");
  //   setFile(JSON.stringify(data));
  // };

  // useEffect(() => {
  //   return () => {
  //     // dispatch(resetPayment());
  //   };
  // }, []);

  return (
    <>
      {/* HERO SECTION STARTS */}
      <div className="pt-[5px] lg:px-[70px] px-5 w-full h-full lg:flex items-center justify-center">
        <div className="lg:flex items-center justify-center w-full space-y-3 lg:space-y-0 lg:w-[95%] h-full lg:h-[600px] lg:mt-[1rem]">
          <div className="w-full h-full">
            <h1 className="text-5xl font-semibold lg:mt-[4rem] leading-[4rem] w-full">
              {" "}
              CALGI securely delivers <br /> your{" "}
              <span className="bg-[#FD6602] p-1 rounded-lg text-white">
                needs.
              </span>
            </h1>
            <p className="mt-12 lg:w-[90%] text-lg font-extralight text-[#5A5A50] ">
              Access basic neccessities at a cheaper rate.
              <br />
              Own your home on a rent to own basis or an outright payment.
              <br />
              Earn dividends when you invest into the co-operative.
              <br />
              Access loans at
              <span className="text-[#FF6700]"> 5% interest rate.</span>
            </p>

            <div className="flex items-center  gap-6 w-max mt-12">
              <button className="flex items-center space-x-3 justify-between  text-lg bg-black py-2 px-4 lg:px-6  lg:py-4 rounded-md w-auto font-bold text-white">
                <p className="font-bold text-sm">Get Started</p>
              </button>

              <div
                onClick={handleAffiliate}
                className="text-black bg-white border-[1px] border-black w-auto join p-2 rounded-lg text-sm px-6 py-3 font-bold cursor-pointer"
              >
                Become an affiliate
              </div>
            </div>
          </div>

          <div className=" w-full h-full">
            <img
              src={hero}
              loading="lazy"
              className="w-full h-full lg:h-full rounded-lg"
            />
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
                    ? "text-[#FD6602] p-2 relative inline-block"
                    : "p-2 relative inline-block"
                }
                onClick={() => handleClick(tab.id, index)}
                key={index}
              >
                {tab.text}
                <span
                  className={
                    active === index
                      ? "absolute block bottom-0 w-[50%] h-[2px] bg-white"
                      : "hidden"
                  }
                ></span>
              </p>
            ))}
          </div>

          <div className="lg:flex items-center w-full lg:gap-12 space-y-[2rem] lg:space-y-0  mt-20">
            <div className="lg:h-[18rem] h-auto p-3 lg:w-full w-full py-[5rem] lg:py-0 flex flex-col items-center justify-center text-center">
              {active === 0 && (
                <p className="mb-2 text-white text-sm">
                  Join The Housing <br /> Co-Operative.
                </p>
              )}
              {active === 1 && (
                <p className="mb-2 text-white text-sm">
                  Join The Housing <br /> Co-Operative.
                </p>
              )}
              {active === 2 && (
                <p className="mb-2 text-white text-sm">
                  Join The Housing <br /> Co-Operative.
                </p>
              )}

              <div className="circle w-[99px] h-[99px] rounded-full border-4 border-[#929292] bg-[#FD6602] flex items-center justify-center">
                <p className="text-white text-sm font-semibold text-center">
                  Step 1
                </p>
              </div>
            </div>

            <div className="lg:h-[18rem] h-auto p-3 lg:w-full w-full py-[5rem] lg:py-0 flex flex-col items-center justify-center">
              {active === 0 && (
                <p className="mb-2 text-white text-sm">
                  Apply For House <br /> Of Your Choice
                </p>
              )}
              {active === 1 && (
                <p className="mb-2 text-white text-sm lg:h-10">
                  Apply For Loan.
                </p>
              )}
              {active === 2 && (
                <p className="mb-2 text-white text-sm lg:h-10">
                  Buy Share Capital.
                </p>
              )}

              <div className="circle w-[99px] h-[99px] rounded-full border-4 border-[#929292] bg-transparent flex items-center justify-center">
                <p className="text-white text-sm font-semibold text-center">
                  Step 2
                </p>
              </div>
            </div>

            <div className="lg:h-[18rem] h-auto p-3 lg:w-full w-full py-[5rem] lg:py-0 flex flex-col items-center justify-center text-center">
              {active === 0 && (
                <p className="mb-2 text-white text-sm">
                  Get House <br /> Allocation
                </p>
              )}
              {active === 1 && (
                <p className="mb-2 text-white text-sm">
                  Get
                  <br /> Approval.
                </p>
              )}
              {active === 2 && (
                <p className="mb-2 text-white text-sm lg:h-10">
                  Review Status.
                </p>
              )}

              <div className="circle w-[99px] h-[99px] rounded-full border-4 border-[#929292] flex items-center justify-center">
                <p className="text-white text-sm font-semibold text-center">
                  Step 3
                </p>
              </div>
            </div>

            <div className="lg:h-[18rem] h-auto p-3 lg:w-full w-full py-[5rem] lg:py-0 flex flex-col items-center justify-center text-center">
              {active === 0 && (
                <p className="mb-2 text-white text-sm">
                  Take Full Possession
                  <br />
                  Of The Property
                </p>
              )}
              {active === 1 && (
                <p className="mb-2 text-white text-sm lg:h-10">Access Loan.</p>
              )}
              {active === 2 && (
                <p className="mb-2 text-white text-sm lg:h-10">Get Earnings.</p>
              )}

              <div className="w-[99px] h-[99px] rounded-full border-4 border-[#929292] flex items-center justify-center">
                <p className="text-white text-sm font-semibold text-center">
                  Step 4
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={handleForm}
            className="flex items-center lg:justify-start justify-center w-full mt-3 lg:pl-20 "
          >
            <h1 className="text-black bg-white join p-2 rounded-lg text-sm px-6 py-3 font-bold cursor-pointer">
              Join co-operative
            </h1>
          </div>

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

      {/* PARTNERS SECTION STARTS */}
      <h1
        // onClick={display}
        className="text-3xl font-extrabold text-black text-center mt-[7rem]"
      >
        Our Partners
        {/* {file && file} */}
      </h1>

      <div className="images lg:flex items-center justify-center w-full flex flex-col lg:flex-row lg:space-x-5 lg:mt-[3rem] mt-20 space-y-5 lg:space-y-0 lg:mb-[10rem]">
        <img src={p1} width={200} height={200} />
        <img src={p2} width={200} height={200} />
        <img src={p3} width={200} height={200} />
        <img src={p4} width={200} height={200} />
        <img src={p5} width={200} height={200} />
        <img src={p6} width={200} height={200} />
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

          <button className="flex items-center space-x-3 justify-between mt-8 mb-16 lg:mb-0 text-lg bg-black py-2 px-4 lg:px-6  lg:py-3 rounded-md w-max font-bold text-white">
            <p className="font-bold text-sm">Register now</p>
          </button>
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
    </>
  );
};

export default Home;
