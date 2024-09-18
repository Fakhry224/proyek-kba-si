"use client";

import { useEffect, useState } from "react";
import Navbar from "../(component)/NavBar";
import axios from "axios";
import CardAnnualCountry from "./CardAnnualCountry";
import CardMonthlySales from "./CardMonthlySales";
import CardAnnualSales from "./CardAnnualSales";
import CardShippingMethodSales from "./CardShippingMethodSales";
import CardAnnualBooks from "./CardAnnualBooks";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      await axios.get("http://localhost:8000/dashboard").then((response) => {
        setDashboardData(response.data);
        // console.log(response.data);
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

  // console.log(dashboardData);

  return (
    <div className="flex text-text w-full min-h-screen">
      <main className="flex flex-col w-full h-full px-9">
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10 my-10">
          <CardAnnualSales data={dashboardData.annualSalesRaw || []} />
          <CardMonthlySales data={dashboardData.monthlySalesRaw || []} />
          <CardShippingMethodSales
            data={dashboardData.shippingMethodSalesRaw || []}
          />
          <CardAnnualBooks data={dashboardData.annualBooks || []} /> 
          <CardAnnualCountry data={dashboardData.countrySalesRaw || []} />
        </div>
        {/* <div className="bg-card h-[30rem] shadow-md rounded-2xl" />
          <div className="bg-card h-[30rem] shadow-md rounded-2xl" /> */}
        {/* <div className="bg-card h-[30rem] shadow-md rounded-2xl" />
          <div className="bg-card h-[30rem] shadow-md rounded-2xl" />
          <div className="bg-card h-[30rem] col-span-2 shadow-md rounded-2xl" /> */}
      </main>
    </div>
  );
};

export default Dashboard;
