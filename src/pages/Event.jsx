import React from "react";
import event from "../assets/events.png";
import shelter from "../assets/shelter.jpeg";

const Event = () => {
  return (
    <div className="px-1 py-5 lg:px-0  w-full h-full mb-[5rem]">
      <div className="w-full lg:h-[600PX] h-[400px] relative">
        <img src={shelter} className="w-full h-full object-cover" />

        <div className="absolute lg:top-20 top-16 w-full left-5 flex flex-col items-start gap-1 z-10">
          <p className="text-[#FF6700] lg:text-[70.33px] text-[40px] font-bold opacity-0">
            SHELTER
          </p>
          <p className="lg:text-[70.33px] text-[40px] font-bold opacity-0">
            CONFERENCE
          </p>
          <p className="lg:text-[70.33px] text-[40px] font-bold opacity-0">
            2024
          </p>
        </div>
      </div>

      <div className="w-full bg-[#1E1C1C] h-max py-12 text-center">
        <p className="text-[#FD6602] mb-5">INTRODUCTION</p>
        <p className="text-[#fff]">
          The Edo Housing Conference is a diverse gathering of stakeholders on
          affordable housing that will convene and collaborate through <br />{" "}
          dialogue, advocacy, research, and education, to develop equitable
          solutions that serve our common interest.
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
