import react, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Input from "../../components/Input";
import add from "../../assets/add.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormData,
  resetFormData,
  setImage,
  corporativeRegister,
} from "../../Redux/Features/formSlice";
import { createPaymentLink } from "../../Redux/Features/paymentSlice";
import { useNavigate } from "react-router-dom";

export const Form1 = ({ close, handleStep, errorHandle }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormData({ name, value }));
    console.log(formData);
  };

  return (
    <div className="w-full flex flex-col gap-5">
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
          onClick={() => {
            if (
              formData.title &&
              formData.nationality &&
              formData.address &&
              formData.gender &&
              formData.dob &&
              formData.lga
            ) {
              handleStep(1);
            } else {
              errorHandle();
            }
          }}
          className="px-4 py-2 w-max bg-black rounded-md text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const Form2 = ({ handleStep, errorHandle }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  // const options = ["Engineer", "Medical Doctor", "Teacher", "Trader", "Farmer"];

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormData({ name, value }));
    console.log(name, value);
  };
  return (
    <div className="w-full flex flex-col gap-5">
      <h1>Profession</h1>
      {/* {options.map((option) => (
        <label key={option} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="profession"
            value={option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))} */}
      <input
        type="text"
        onChange={handleChange}
        value={formData.profession}
        name="profession"
        placeholder="other"
        className="w-full h-[46.291px] -mt-2  mb-3 appearance-none border-[1px] border-black rounded-[10px] focus:outline-none p-2"
      />

      <Input
        type={"text"}
        name={"officeAddress"}
        placeholder={"Enter your answer"}
        label={"Home Address"}
        value={formData.officeAddress}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"statusRank"}
        placeholder={"Enter your answer"}
        label={"Status Rank"}
        value={formData.statusRank}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"monthlyIncome"}
        placeholder={"Enter your answer"}
        label={"Monthly Income"}
        value={formatNumberWithCommas(formData.monthlyIncome)}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"yearsOfService"}
        placeholder={"Enter your answer"}
        label={"Years of Service so Far"}
        value={formData.yearsOfService}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"retirementAge"}
        placeholder={"Enter your answer"}
        label={"Retirement Age"}
        value={formData.retirementAge}
        onChange={handleChange}
      />

      <div className="mt-3 flex items-center  gap-3 w-full">
        <button
          onClick={() => handleStep(0)}
          className="px-4 py-2 w-max bg-[#50505099] rounded-md text-white"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (
              formData.profession &&
              formData.officeAddress &&
              formData.statusRank &&
              formData.monthlyIncome &&
              formData.yearsOfService &&
              formData.retirementAge
            ) {
              handleStep(2);
            } else {
              errorHandle();
            }
          }}
          className="px-4 py-2 w-max bg-black rounded-md text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const Form3 = ({ handleStep, errorHandle }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const [terms, setTerms] = useState(false);
  const navigate = useNavigate();
  const options = [
    "SSCE or Equivalent",
    "Undergraduate",
    "Graduate",
    "Post Graduate",
  ];

  const {
    title,
    nationality,
    address,
    gender,
    dob,
    lga,
    profession,
    officeAddress,
    statusRank,
    monthlyIncome,
    yearsOfService,
    retirementAge,
    educationalQualification,
    nextOfKinName,
    nextOfKinAddress,
    relationship,
    nextOfKinPhoneNumber,
    nextOfKinEmail,
  } = useSelector((state) => state.formData);

  const { paymentStatus, paymentLoading } = useSelector(
    (state) => state.payment
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormData({ name, value }));
    // console.log(name, value);
  };

  const vercelRedirect = "https://charis-eight.vercel.app/verify";
  const liveRedirect = "https://calgi.org/verify";
  const makePayment = () => {
    if (
      title &&
      nationality &&
      address &&
      gender &&
      dob &&
      lga &&
      profession &&
      officeAddress &&
      statusRank &&
      monthlyIncome &&
      yearsOfService &&
      retirementAge &&
      educationalQualification &&
      nextOfKinName &&
      nextOfKinAddress &&
      relationship &&
      nextOfKinPhoneNumber &&
      nextOfKinEmail &&
      terms
    ) {
      const reqBody = {
        amount: "25000",
        redirect: liveRedirect,
        tag: "reg",
      };
      dispatch(createPaymentLink(reqBody));
    } else {
      errorHandle();
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <h1>Educational Qualification</h1>
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="educationalQualification"
            value={option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}
      <input
        type="text"
        onChange={handleChange}
        value={formData.educationalQualification}
        name="educationalQualification"
        placeholder="other"
        className="w-full h-[46.291px] -mt-2  mb-3 appearance-none border-[1px] border-black rounded-[10px] focus:outline-none p-2"
      />

      <h1 className="text-lg font-sans font-semibold my-2">Next Of Kin Info</h1>

      <Input
        type={"text"}
        name="nextOfKinName"
        placeholder={"Enter your answer"}
        label={"Next of Kin Full Name"}
        value={formData.nextOfKinName}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"nextOfKinAddress"}
        placeholder={"Enter your answer"}
        label={"Next of Kin Home Address"}
        value={formData.nextOfKinAddress}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"relationship"}
        placeholder={"Enter your answer"}
        label={"Next of Kin Relationship with member"}
        value={formData.relationship}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"nextOfKinPhoneNumber"}
        placeholder={"Enter your answer"}
        label={"Next of Kin Phone Number"}
        value={formData.nextOfKinPhoneNumber}
        onChange={handleChange}
      />

      <Input
        type={"text"}
        name={"nextOfKinEmail"}
        placeholder={"Enter your answer"}
        label={"Next of Kin Email Address"}
        value={formData.nextOfKinEmail}
        onChange={handleChange}
      />

      <div className="flex items-center gap-5">
        <input
          type="checkbox"
          name="houseType"
          value={terms}
          onChange={() => setTerms(!terms)}
        />
        <label
          onClick={() => navigate("/terms")}
          className="flex items-center gap-3 cursor-pointer text-black/50"
        >
          Agree to terms and conditions
        </label>
      </div>
      <div className="mt-3 flex items-center  gap-3 w-full">
        <button
          onClick={() => handleStep(1)}
          className="px-4 py-2 w-max bg-[#50505099] rounded-md text-white"
        >
          Back
        </button>
        <button
          onClick={makePayment}
          className="px-4 py-2 w-max bg-black rounded-md text-white"
        >
          {paymentLoading ? "Processing Payment" : "Proceed to payment"}
        </button>
      </div>
    </div>
  );
};

export const Form4 = ({ handleStep, errorHandle }) => {
  // const [previewImageUrl, setPreviewImageUrl] = useState("");
  // const [picture, setPicture] = useState("");
  const dispatch = useDispatch();

  const { paymentStatus, paymentLoading } = useSelector(
    (state) => state.payment
  );

  const options = ["Bungalow", "Flats", "Duplex"];
  const options1 = ["1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom"];
  const options2 = [
    "Egba Layout after Auchi road bypass",
    "Obe Layout before Sapele Road bypass",
    "Etete Layout",
    "Along Sapele road",
    "Along Adesuwa road",
    "Amufi Layout",
    "NPDC Layout",
  ];
  const options3 = [
    "50% Payment & 1yr Spread of Balance",
    "50% Payment & 2yr spread of Balance",
    "371k & Monthly payment for 5 to 30 yrs",
  ];

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    dispatch(updateFormData({ name, value, files }));

    // console.log(files[0]);
    if (files) {
      setPicture(files[0]);
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
    }
  };

  // const handleImage = (e) => {
  //   const { files } = e.target;
  //   dispatch(setImage(files[0]));

  // };

  // const localRedirect = "http://localhost:5173/verify";

  // useEffect(() => {
  //   if (corporativeSuccess) {
  //     const reqBody = {
  //       amount: "25000",
  //       redirect: "http://localhost:5173/verify",
  //       tag: "reg",
  //     };
  //     dispatch(createPaymentLink(reqBody));
  //   }

  //   if (corporativeError) {
  //     toast.error(corporativeMessage);
  //   }
  // }, [corporativeSuccess, corporativeError, corporativeSuccess]);

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-lg font-sans font-semibold my-1">
        House Information
      </h1>
      <h1>House Type</h1>
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3 cursor-pointer text-black/50"
        >
          <input
            type="radio"
            name="houseType"
            value={option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}

      <h1 className="mt-3">House Size</h1>
      {options1.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3 cursor-pointer text-black/50"
        >
          <input
            type="radio"
            name="houseSize"
            value={option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}

      <h1 className="mt-3">Preferred Location</h1>
      {options2.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3 cursor-pointer text-black/50"
        >
          <input
            type="radio"
            name="preferredLocation"
            value={option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}

      <h1>Select Payment Preference</h1>
      {options3.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3 cursor-pointer text-black/50"
        >
          <input
            type="radio"
            name="paymentPlan"
            value={option}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}

      {/* <h1 className="text-base font-sans font-medium my-1">
        Passport Upload (Passport Selfie Picture)
      </h1> */}

      {/* <div className="flex items-center justify-between">
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
          <p className='absolute left-[8.5rem] w-full'>{file ? file.name : null}</p>
        </div>

        <img
          src={previewImageUrl ? previewImageUrl : null}
          className="w-16 h-16 rounded-full"
        />
      </div> */}

      <div className="mt-3 flex items-center  gap-3 w-full">
        <button
          onClick={() => handleStep(2)}
          className="px-4 py-2 w-max bg-[#50505099] rounded-md text-white"
        >
          Back
        </button>
        <button
          onClick={makePayment}
          className="px-4 py-2 w-max bg-black rounded-md text-white"
        >
          {corporativeLoading
            ? "processing Registration"
            : paymentLoading
            ? "Processing Payment"
            : "Proceed to payment"}
        </button>
      </div>
    </div>
  );
};
