"use client";

import { useEffect, useState } from "react";
import Sidebar from "../(component)/Sidebar"; // Import Sidebar
import HorizontalCardStoryTelling from "../(component)/HorizontalCardStoryTelling";
import VerticalCardStoryTelling from "../(component)/VerticalCardStoryTelling";
import axios from "axios";
import CardAnnualCountry from "./CardAnnualCountry";
import CardMonthlySales from "./CardMonthlySales";
import CardAnnualSales from "./CardAnnualSales";
import CardShippingMethodSales from "./CardShippingMethodSales";
import CardAnnualBooks from "./CardAnnualBooks";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(baseUrl);
      setDashboardData(response.data);
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
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col text-primary w-full min-h-screen ml-16 md:ml-64 transition-all duration-300">
        <main className="w-full h-full px-9">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <CardAnnualSales data={dashboardData.annualSalesRaw} />
            <CardMonthlySales data={dashboardData.monthlySalesRaw} />
            <CardShippingMethodSales
              data={dashboardData.shippingMethodSalesRaw}
            />
            <CardAnnualBooks data={dashboardData.annualBooks} />
            <CardAnnualCountry data={dashboardData.countrySalesRaw} />
          </div>
          <HorizontalCardStoryTelling data={dashboardData.annualBooks} />
          <VerticalCardStoryTelling data={dashboardData.annualSalesRaw} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
