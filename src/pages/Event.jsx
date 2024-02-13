import React from "react";
import event from "../assets/events.png";
import shelter from "../assets/WhatsApp Image 2024-02-12 at 08.04.41_92a91fc9";

const Event = () => {
  return (
    <div className="px-1 py-5 lg:px-0  w-full h-full mb-[5rem]">
      <div className="w-full lg:h-[600PX] h-[400px] relative">
        <img src={shelter} className="w-full h-full object-cover" />

        <div className="absolute lg:top-20 top-16 w-full left-5 flex flex-col items-start gap-1 z-10">
          <p className="text-[#FF6700] lg:text-[70.33px] text-[40px] font-bold opacity-0">
            HOME OWNERSHIP
          </p>
          <p className="lg:text-[70.33px] text-[40px] font-bold opacity-0">
            PRESENTATION
          </p>
          <p className="lg:text-[70.33px] text-[40px] font-bold opacity-0">
           
          </p>
        </div>
      </div>

      <div className="w-full bg-[#1E1C1C] h-max py-12 text-center">
        <p className="text-[#FD6602] mb-5">INTRODUCTION</p>
        <p className="text-[#fff]">
        Welcome to The Home Ownership Presentation! Brought to you by CHARIS ADVANTAGE GROUP. 
        Today, we're here to delve into a topic that holds a significant place in many of our lives: 
        Home Ownership. Whether you're considering buying your first home, looking to upgrade, 
        or exploring investment opportunities, the journey towards owning a home is both exciting and daunting. 
        In this presentation, we'll navigate through the essentials of home ownership, 
        from understanding the market trends to financial planning, and ultimately, 
        making informed decisions to secure your dream home. So, 
        let's dive in and explore the keys to unlocking the doors of homeownership success.
        </p>

        <a href="https://forms.gle/xBNxgqcLDMzcL3MC8/">
          <button className="bg-[#FF6700] mt-5 w-max py-3 px-4 border border-[#000] rounded-md text-white text-sm ">
            Register your interest
          </button>
        </a>
      </div>
    </div>
  );
};

export default Event;
