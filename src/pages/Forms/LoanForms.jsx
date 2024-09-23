import react, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../../components/Input";
import add from "../../assets/add.svg";
import { useDispatch, useSelector } from "react-redux";

export const LoanForm1 = ({ close, handleStep }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormData({ name, value }));
    console.log(formData);
  };

  return (
    <form className="w-full flex flex-col gap-5">
      <Input
        type={"text"}
        name={"title"}
        placeholder={"Mr, Mrs, Miss, Dr, Chief..."}
        label={"Title"}
        value={formData.title}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"nationality"}
        placeholder={"Enter your answer"}
        label={"Nationality"}
        value={formData.nationality}
        onChange={handleChange}
      />

      <Input
        type={"email"}
        name={"address"}
        placeholder={"Enter your answer"}
        label={"Home Address"}
        value={formData.address}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"gender"}
        placeholder={"Male, Female..."}
        label={"Gender"}
        value={formData.gender}
        onChange={handleChange}
      />

      <Input
        type={"date"}
        name={"dob"}
        placeholder={"mm/dd/yyyy"}
        label={"Date of Birth"}
        value={formData.dob}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"lga"}
        placeholder={"Your answer"}
        label={"L.G.A of Origin"}
        value={formData.lga}
        onChange={handleChange}
      />

      <div className="mt-3 flex items-center  gap-3 w-full">
        <button
          onClick={close}
          className="px-4 py-2 w-max bg-[#50505099] rounded-md text-white"
        >
          Cancel
        </button>
        <button
          onClick={() => handleStep(1)}
          className="px-4 py-2 w-max bg-black rounded-md text-white"
        >
          {" "}
          Next{" "}
        </button>
      </div>
    </form>
  );
};
