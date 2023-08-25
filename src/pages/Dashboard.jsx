import React from "react";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.png";
import money from "../assets/money.svg";
import target from "../assets/target.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full lg:flex gap-[60px] px-5 lg:px-[70px] mb-10 mt-10">
      <div className="lg:flex-1 w-full h-full">
        {/* DASHBOARD BANNER */}
        <div className="w-full  lg:px-0 h-[230px] aspect-auto rounded-[10px] profile-banner bg-cover lg:bg-cover bg-no-repeat bg-left flex flex-col items-center justify-center">
          <div className="lg:w-[500px] flex flex-col gap-4 lg:gap-1 lg:pl-5 w-full px-5 h-full lg:h-auto pt-10 lg:pt-0 lg:mt-0 bg-black/60 lg:bg-transparent">
            <h1 className="text-white/70 text-sm font-extralight text-left">
              Hi, Umoru Emmanuel
            </h1>
            <h1 className="text-white text-xl font-medium my-1 text-left">
              Welcome to your Client Dashboard
            </h1>
            <h1 className="text-white/70 text-sm font-extralight text-left">
              Here, You can track your payment , View your profile status , get
              a loan and so much more{" "}
            </h1>
          </div>
        </div>

        {/* CARD SECTION STARTS HERE */}
        <div className="w-full lg:flex gap-8 h-max mt-3">
          <div className="h-[185px] w-full lg:w-[290px] bg-white shadow-md shadow-black/30 pt-2 px-3 rounded-[5px]">
            {/* TOP CARD SECTION */}
            <div className="w-full flex items-center justify-between">
              <p className="text-sm text-black/50">Total investment</p>
              <img src={money} className="bg-[#FD6602] p-1" />
            </div>

            {/* MIDDLE CARD SECTION*/}
            <p className="font-bold font-sans text-black text-2xl tracking-widest mt-8">
              N200,000
            </p>

            {/* BOTTOM CARD SECTION*/}
            <div className="flex items-center justify-between text-xs mt-8">
              <p className="w-[200px]">
                Note: Next payment coming up 10 August,2023
              </p>
              <div className="bg-black px-2 py-1 rounded-[5px] text-white text-center text-xs w-max">
                pay now
              </div>
            </div>
          </div>

          <div className="h-[185px] w-full lg:w-[290px] bg-white shadow-md shadow-black/30 pt-2 px-3 rounded-[5px] mt-9 lg:mt-0">
            {/* TOP CARD SECTION */}
            <div className="w-full flex items-center justify-between">
              <p className="text-sm text-black/50">Investment Target</p>
              <img src={target} className="bg-[#FD6602] p-1" />
            </div>

            {/* MIDDLE CARD SECTION*/}
            <p className="font-bold font-sans text-black text-2xl tracking-widest mt-8">
              N5,000,000
            </p>
          </div>
        </div>

        <h1 className="text-lg font-bold mt-10">Payment History</h1>

        <div className="w-full overflow-x-auto">
          <table className="mt-10 w-full table-auto">
            <thead className="w-full">
              <tr className="text-black/50 font-extralight">
                <th className="text-left pb-2">Name</th>
                <th className="text-left pb-2">Amount</th>
                <th className="text-left pb-2">Date</th>
                <th className="text-left pb-2">Status</th>
                <th className="text-left pb-2">Ref</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="pb-2 pr-8">Umoru Emmanuel</td>
                <td className="pb-2 pr-8">N20,000</td>
                <td className="pb-2 pr-8">01/08/2023</td>
                <td className="pb-2 pr-8 text-green-400">Successful</td>
                <td className="pb-2 pr-8">0011054FY</td>
              </tr>
              <tr>
                <td className="pb-2 pr-8">Umoru Emmanuel</td>
                <td className="pb-2 pr-8">N20,000</td>
                <td className="pb-2 pr-8">01/08/2023</td>
                <td className="pb-2 pr-8 text-green-400">Successful</td>
                <td className="pb-2 pr-8">0011054FY</td>
              </tr>
              <tr>
                <td className="pb-2 pr-8">Umoru Emmanuel</td>
                <td className="pb-2 pr-8">N20,000</td>
                <td className="pb-2 pr-8">01/08/2023</td>
                <td className="pb-2 pr-8 text-red-400">Successful</td>
                <td className="pb-2 pr-8">0011054FY</td>
              </tr>
              <tr>
                <td className="pb-2 pr-8">Umoru Emmanuel</td>
                <td className="pb-2 pr-8">N20,000</td>
                <td className="pb-2 pr-8">01/08/2023</td>
                <td className="pb-2 pr-8 text-green-400">Successful</td>
                <td className="pb-2 pr-8">0011054FY</td>
              </tr>
              <tr>
                <td className="pb-2 pr-8">Umoru Emmanuel</td>
                <td className="pb-2 pr-8">N20,000</td>
                <td className="pb-2 pr-8">01/08/2023</td>
                <td className="pb-2 pr-8 text-red-400">Successful</td>
                <td className="pb-2 pr-8">0011054FY</td>
              </tr>
              <tr>
                <td className="pb-2 pr-8">Umoru Emmanuel</td>
                <td className="pb-2 pr-8">N20,000</td>
                <td className="pb-2 pr-8">01/08/2023</td>
                <td className="pb-2 pr-8 text-red-400">Successful</td>
                <td className="pb-2 pr-8">0011054FY</td>
              </tr>
              <tr>
                <td className="pb-2 pr-8">Umoru Emmanuel</td>
                <td className="pb-2 pr-8">N20,000</td>
                <td className="pb-2 pr-8">01/08/2023</td>
                <td className="pb-2 pr-8 text-green-400">Successful</td>
                <td className="pb-2 pr-8">0011054FY</td>
              </tr>
              <tr>
                <td className="pb-2 pr-8">Umoru Emmanuel</td>
                <td className="pb-2 pr-8">N20,000</td>
                <td className="pb-2 pr-8">01/08/2023</td>
                <td className="pb-2 pr-8 text-green-400">Successful</td>
                <td className="pb-2 pr-8">0011054FY</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:w-[330px] w-full h-full mt-10 lg:mt-0">
        {/* NAVIGATION BUTTON */}
        <div
          onClick={() => navigate("/layout")}
          className="w-full h-[32px] flex bg-black items-center justify-center gap-5 rounded-[5px] cursor-pointer"
        >
          <h1 className="text-white">Go back to website</h1>
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

        {/* PROFILE SECTION */}
        <div className="flex flex-col w-full h-full items-center justify-center lg:px-[40px] px-5 mt-5 bg-white shadow-md shadow-black/30">
          {/* PROFILE SECTION STARTS HERE */}
          <img
            src={dp}
            alt="profile image"
            className="w-[138px] h-[138px] rounded-full mt-10 object-cover mb-5"
          />

          <h1 className="font-bold text-xl">Umoru Emmanuel</h1>
          <p className="text-black/70">(Active User)</p>

          <p className="text-black/70 mt-8">Umoru.emmanuel@yahoo.com</p>
          <p className="text-black/70">+234-907-634-5063</p>

          <div className="bg-[rgb(253,102,2)] h-[18px] py-[15px] px-[25px] rounded-[5px] flex items-center justify-center my-7 text-white">
            Get a loan
          </div>
          {/* PROFILE SECTION ENDS HEREm*/}

          {/* ONLINE STORE DISPLAY STARTS HERE */}
          <div className="lg:w-[280px] w-full h-[231px] bg-no-repeat bg-center bg-shop-banner object-cover rounded-[10px] mb-20 px-5">
            <div className="w-[92px] h-[24px] bg-white rounded-[10px] mt-4 flex items-center justify-center">
              <p className="text-xs text-center">Shop Online</p>
            </div>

            <p className="text-sm mt-3 text-white">
              Shop through our platform and get a{" "}
              <span className="text-black"> 10%</span> Discount
            </p>
          </div>
          {/* ONLINE STORE DISPLAY ENDS HERE */}

          {/* CARD DISPLAY STARTS HERE */}
          <div className="lg:w-[290px] w-full bg-no-repeat bg-center h-[178px] bg-card-banner  object-cover rounded-[20px] mb-10 px-5 ">
            <p className="text-white/70 font-extralight mt-5 text-xs">
              Debit Naira
            </p>
            <p className="text-white/70 w-[240px] font-extralight mt-[40px] text-sm flex items-center justify-between ">
              <span className="tracking-widest font-extralight"> 2259 </span>
              <span className="tracking-widest font-extralight"> 4122 </span>
              <span className="tracking-widest font-extralight"> 7956 </span>
              <span className="tracking-widest font-extralight"> 2812 </span>
            </p>
            <p className="text-white/70 font-extralight mt-2 text-xs">12/25</p>
            <p className="text-white/70 font-bold mt-3 text-sm">
              Umoru Emmanuel
            </p>
          </div>
          {/* CARD DISPLAY ENDS HERE */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
