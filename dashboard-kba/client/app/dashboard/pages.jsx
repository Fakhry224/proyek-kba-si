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
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchDashboardData = async () => {
    try {
      await axios.get(baseUrl).then((response) => {
        setDashboardData(response.data);
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
    <div className="flex text-primary w-full min-h-screen flex-col">
      <Navbar />
      <main className="w-full h-full px-9">
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 ">
          <CardAnnualSales data={dashboardData.annualSalesRaw} />
          <CardMonthlySales data={dashboardData.monthlySalesRaw} />
          <CardShippingMethodSales
            data={dashboardData.shippingMethodSalesRaw}
          />
          <CardAnnualBooks data={dashboardData.annualBooks} />
          <CardAnnualCountry data={dashboardData.countrySalesRaw} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
