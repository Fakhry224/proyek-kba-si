import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { years, asianCountries, annualCountryAnalyze } from "../lib/lib.js";

import {
  BarChart,
  Bar,
  Cell,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p
          className="label font-bold text-center text-[1rem]"
          style={{ color: "#000" }}
        >{`Year: ${label}`}</p>
        ;
        {payload.map((item) => (
          <div key={item.name} style={{ marginBottom: "5px" }}>
            <p style={{ color: "#000" }}>{`${item.name}: $${item.value}`}</p>
            <p style={{ color: item.payload.category }}>
              {`PercentageChange: ${item.payload.percentageChange}%`}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const CardAnnualCountry = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(2024);

  const analyzedData = annualCountryAnalyze(data)
    .filter((item) => asianCountries.includes(item.country))
    .filter((item) => item.year == selectedYear)
    .sort((a, b) => b.total_revenue - a.total_revenue);

  const maxRevenue = Math.max(
    ...analyzedData.map((item) => item.total_revenue)
  );

  return (
    <div className="bg-card h-[35rem] col-span-2 shadow-md relative rounded-2xl w-full px-10 pt-10 my-10">
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-text text-center font-bold text-[1.5rem] lg:text-[2rem] pb-5">
            Pendapatan Berdasarkan Negara
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
          data={analyzedData}
          margin={{ top: 90, right: 30, left: 0, bottom: 15 }}
        >
          <XAxis dataKey="country" />
          <YAxis domain={[0, maxRevenue + 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="total_revenue"
            fill="#8884d8"
            activeBar={<Rectangle stroke="blue" />}
          >
            {analyzedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.category} />
            ))}
            <LabelList dataKey="total_revenue" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CardAnnualCountry;
