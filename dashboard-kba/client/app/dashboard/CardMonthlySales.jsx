import React, { useEffect, useState } from "react";
import { monthNames } from "../lib/lib.js";
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

const prepareChartData = (monthlySalesRaw) => {
  const chartData = [];

  for (let month = 1; month <= 12; month++) {
    const monthData = { month: monthNames[month - 1] };

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
    <div className="bg-card w-full shadow-md rounded-2xl p-4 h-[35rem]">
      <h1 className="text-text text-center font-bold text-[1.5rem] lg:text-[2rem] pt-2">
        Pendapatan Bulanan
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />

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
