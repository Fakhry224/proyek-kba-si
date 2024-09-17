"use client";

import { useEffect, useState } from "react";
import Navbar from "../(component)/NavBar";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);

  const fetchDashboardData = async () => {
    try {
      await axios.get("http://localhost:8000/dashboard").then((response) => {
        setDashboardData(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex text-text w-full min-h-screen">
      <main className="flex flex-col w-full h-full px-9">
        <Navbar />
        <h1 className="font-bold text-[4rem] ml-10 my-10 text-center">
          Dashboard Analytics
        </h1>
        <div>
          {/* Contoh Implementasi Data */}
          <h2>Annual Sales</h2>
          {dashboardData.annualSalesRaw &&
          dashboardData.annualSalesRaw.length > 0 ? (
            <ul>
              {dashboardData.annualSalesRaw.map((item, index) => (
                <li key={index}>
                  Year: {item.year}, Total Revenue: {item.total_revenue}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-10 my-10">
          <div className="bg-card h-[30rem] shadow-md rounded-2xl" />
          <div className="bg-card h-[30rem] shadow-md rounded-2xl" />
          <div className="bg-card h-[30rem] shadow-md rounded-2xl" />
          <div className="bg-card h-[30rem] shadow-md rounded-2xl" />
          <div className="bg-card h-[30rem] col-span-2 shadow-md rounded-2xl" />
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;
