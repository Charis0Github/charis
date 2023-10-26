import React from "react";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import instagram from "../assets/instagram.svg";

const Footer = () => {
  return (
    <div className="w-full lg:h-[176px] h-max bg-black  px-5 rounded-t-3xl lg:py-[1rem] py-[2rem]">
      {/* RIGHT SECTION FOOTER STARTS */}
      <div className="w-full lg:px-[64px] lg:pb-4 lg:flex items-center lg:justify-between">
        <div className="w-full text-xs leading-7 lg:leading-5 mb-5 lg:mb-0 tracking-wider capitalize">
          <p className="text-white">Mon-Fri 8:30AM-5:00PM</p>
          <p className="text-white">+234 808 186 2750</p>
          <p className="text-white">
            2nd Floor,No 1 ogbelaka street,opposite Federal High <br />{" "}
            court,Sapele Road,Benin City.
          </p>
        </div>

        <div className="flex items-center space-x-6 lg:pr-5 mb-5 lg:mb-0">
          <a href="https://web.facebook.com/Calgi.org">
            <img src={facebook} width={25} height={25} />
          </a>

          <a href="https://twitter.com/CharisAdvantage">
            <img src={twitter} width={25} height={25} />
          </a>

          <a href="https://www.instagram.com/charisadvantage/">
            <img src={instagram} width={25} height={25} />
          </a>
        </div>
      </div>

      <hr />
      {/* RIGHT SECTION FOOTER STARTS */}

      <div className="text-white text-xs lg:px-[64px] lg:py-5 py-3">
        <p>Copyright &copy; 2022 Charis Advantage life-Group International.</p>
      </div>
    </div>
  );
};

export default Footer;
