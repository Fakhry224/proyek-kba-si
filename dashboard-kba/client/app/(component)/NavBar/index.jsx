import React from "react";

const Navbar = () => {
  return (
    <div className="relative flex justify-center items-center min-h-[100px] mb-10">
      {/* Trapezium background with rounded corners */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-secondary"
        style={{
          clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0% 100%)",
          borderRadius: "25px", // softens the corners of the trapezium
          transform: "rotate(180deg)",
        }}
      ></div>

      {/* Navbar with pill-shaped buttons */}
      <div className="relative flex space-x-4 p-4">
        <button className="flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg">
          <span className="text-lg">🔍</span>
          <span>Treatment Dynamics</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-200 text-gray-900 px-4 py-2 rounded-full shadow-lg">
          <span className="text-lg">🗓️</span>
          <span>Visits</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-200 text-gray-900 px-4 py-2 rounded-full shadow-lg">
          <span className="text-lg">💊</span>
          <span>Medications</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
