import { useState } from "react";
import {
  FaChartPie,
  FaChartBar,
  FaDollarSign,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={`flex flex-col bg-gray-800 text-white ${
        isExpanded ? "w-64" : "w-16"
      } h-screen shadow-md fixed transition-all duration-300`}
    >
      {/* Header Sidebar */}
      <div
        className="p-4 text-center font-bold text-xl border-b border-gray-700 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          "Sidebar"
        ) : (
          <span className="text-white text-2xl">☰</span>
        )}
      </div>

      {/* Navigasi */}
      <nav className="flex flex-col space-y-4 mt-4">
        <a
          href="#"
          className="flex items-center justify-center hover:bg-gray-700 py-2 px-4 rounded transition-all"
        >
          <FaChartPie className="text-xl text-white" />
          {isExpanded && <span className="ml-3">Dashboard</span>}
        </a>
        <a
          href="#"
          className="flex items-center justify-center hover:bg-gray-700 py-2 px-4 rounded transition-all"
        >
          <FaChartBar className="text-xl text-white" />
          {isExpanded && <span className="ml-3">Analytics</span>}
        </a>
        <a
          href="#"
          className="flex items-center justify-center hover:bg-gray-700 py-2 px-4 rounded transition-all"
        >
          <FaDollarSign className="text-xl text-white" />
          {isExpanded && <span className="ml-3">Sales</span>}
        </a>
        <a
          href="#"
          className="flex items-center justify-center hover:bg-gray-700 py-2 px-4 rounded transition-all"
        >
          <FaFileAlt className="text-xl text-white" />
          {isExpanded && <span className="ml-3">Reports</span>}
        </a>
        <a
          href="#"
          className="flex items-center justify-center hover:bg-gray-700 py-2 px-4 rounded transition-all"
        >
          <FaCog className="text-xl text-white" />
          {isExpanded && <span className="ml-3">Settings</span>}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
