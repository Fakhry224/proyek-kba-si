import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { years, shippingMethodSalesAnalyze, monthNames } from "../lib/lib";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const CardShippingMethodSales = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(2024);

  const getQuartal = (month) => {
    if (month <= 3) return "Q1";
    if (month <= 6) return "Q2";
    if (month <= 9) return "Q3";
    return "Q4";
  };

  const groupedData = data.reduce((acc, item) => {
    const year = item.year;
    const quartal = getQuartal(item.month);

    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][quartal]) {
      acc[year][quartal] = {
        year,
        quartal,
        months: new Set(),
        Express: 0,
        International: 0,
        Priority: 0,
        Standard: 0,
      };
    }

    acc[year][quartal].months.add(monthNames[item.month - 1]);

    acc[year][quartal][item.method_name] += parseFloat(item.total_revenue);
    return acc;
  }, {});

  const chartData = Object.values(groupedData[selectedYear] || {});

  shippingMethodSalesAnalyze(chartData);

  return (
    <div className="bg-card h-[35rem] shadow-md rounded-2xl relative w-full px-10 pt-10">
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-text text-center font-bold text-[1.5rem] lg:text-[2rem] pb-5 whitespace-nowrap">
            Pendapatan Pengiriman per Kuartal
          </h1>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            {years.map((year) => (
              <Button
                key={year}
                onClick={() => setSelectedYear(year)}
                color={selectedYear === year ? "primary" : "inherit"}
              >
                {year}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 90, right: 30, left: 20, bottom: 15 }}
        >
          <XAxis dataKey="quartal" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Express.value" fill="#8884d8">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.Express.category} />
            ))}
          </Bar>
          <Bar dataKey="International" fill="#82ca9d" />
          <Bar dataKey="Priority" fill="#ffc658" />
          <Bar dataKey="Standard" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CardShippingMethodSales;
