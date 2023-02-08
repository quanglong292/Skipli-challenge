import React from "react";

const Button = (props) => {
  const { children } = props;
  return (
    <button
      className="border-2 border-gray-500 rounded-md bg-white hover:bg-slate-200 px-2 font-semibold w-auto h-[30px] mb-1"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
