import React from "react";

const Navbar = () => {
  return (
    <div className="relative flex justify-center items-center min-h-[100px] mb-10">
      {/* Trapezium background with rounded corners */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-secondary"
        style={{
          clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0% 100%)",
          transform: "rotate(180deg)",
        }}
      ></div>

      {/* Navbar with pill-shaped buttons */}
      <div className="relative flex space-x-4 p-4">
        <h1 className="font-bold text-[4rem] ml-10 my-10 text-center">
          Dashboard Analytics
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
