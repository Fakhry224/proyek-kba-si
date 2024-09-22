import React from "react";

const Navbar = () => {
  return (
    <div className="relative flex justify-center items-center min-h-[100px] mb-10">
      <div
        className="absolute top-0 left-0 w-full h-full bg-nav shadow-md"
        style={{
          clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0% 100%)",
          transform: "rotate(180deg)",
        }}
      ></div>

      <div className="relative flex space-x-4 p-4">
        <h1 className="font-bold text-[2.5rem] lg:text-[3rem] xl:text-[4rem] my-10 lg:my-14 text-center shadow-md">
          Dashboard Analytics Gravity Book Store
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
