import React from "react";

const Input = ({
  label,
  placeholder,
  type,
  value,
  name,
  onChange,
  maxLength,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <label className="font-sans text-sm">{label}</label>
        {/* <input type='checkbox' className=''/> */}
      </div>
      <input
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full h-[46.291px] mt-2 appearance-none border-[1px] border-black rounded-[10px] focus:outline-none p-2"
      />
    </div>
  );
};

export default Input;
