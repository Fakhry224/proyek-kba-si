import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Helper function to map month numbers to names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Function to prepare data in desired format
const prepareChartData = (monthlySalesRaw) => {
  const chartData = [];

  // Loop through all months (1-12)
  for (let month = 1; month <= 12; month++) {
    const monthData = { month: monthNames[month - 1] };

    // Find sales data for each year in the current month
    monthlySalesRaw.forEach((item) => {
      if (item.month === month) {
        monthData[`year_${item.year}`] = parseFloat(item.total_revenue);
      }
    });

    chartData.push(monthData);
  }

  return chartData;
};

const CardMonthlySales = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      const processedData = prepareChartData(data);
      setChartData(processedData);
    }
  }, [data]);

  return (
    <div className="bg-card h-[30rem] shadow-md rounded-2xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />

          {/* Lines for each year */}
          <Line
            type="monotone"
            dataKey="year_2021"
            stroke="#8884d8"
            name="2021"
          />
          <Line
            type="monotone"
            dataKey="year_2022"
            stroke="#82ca9d"
            name="2022"
          />
          <Line
            type="monotone"
            dataKey="year_2023"
            stroke="#ff7300"
            name="2023"
          />
          <Line
            type="monotone"
            dataKey="year_2024"
            stroke="#413ea0"
            name="2024"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CardMonthlySales;
