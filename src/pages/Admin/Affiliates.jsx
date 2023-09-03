import React from "react";

const Affiliates = () => {
  return (
    <div className="flex flex-col w-full px-10 h-screen py-8 overflow-y-auto">
      <div className="w-full overflow-x-auto">
        <table className="mt-10 w-full table-auto">
          <thead>
            <tr className="text-black/50 font-extralight">
              <th className="text-left pb-2 w-[300px]">Name</th>
              <th className="text-left pb-2 w-[300px]">Date Joined</th>
              <th className="text-left pb-2 w-[300px]">Share Capital</th>
              <th className="text-left pb-2 w-[300px]">Gender</th>
              <th className="text-left pb-2 w-[300px]">Phone</th>
              <th className="text-left pb-2 w-[300px]">Email</th>
              <th className="text-left pb-2 w-[300px]">Points</th>
              <th className="text-left pb-2 w-[300px]">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-clip pr-3">Umoru Emmanuel benson ikenna</td>
              <td className=" pr-3">03, Jun 2023</td>
              <td className=" pr-3">N100,000 </td>
              <td className=" pr-3">Male</td>
              <td className=" pr-3">09076....</td>
              <td className=" pr-3">Umoru.em...</td>
              <td className="flex items-center gap-2 w-full py-2 pr-3">
                <p className="text-black text-lg ">1</p>
                <div className="text-white px-5 text-2xl h-max rounded-md bg-black flex items-center gap-5">
                  <p>-</p>
                  <p>+</p>
                </div>
              </td>
              <td className="pr-3">views</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Affiliates;
