import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const asianCountries = [
  "Afghanistan",
  "Armenia",
  "Azerbaijan",
  "Bangladesh",
  "China",
  "Indonesia",
  "Iran",
  "Israel",
  "Japan",
  "Kazakhstan",
  "Kyrgyzstan",
  "Malaysia",
  "Mongolia",
  "Myanmar",
  "Nepal",
  "North Korea",
  "Pakistan",
  "Philippines",
  "Russia",
  "South Korea",
  "Syria",
  "Tajikistan",
  "Thailand",
  "Uzbekistan",
  "Vietnam",
  "Yemen",
];

const years = ["2021", "2022", "2023", "2024"];

const CardAnnualCountry = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const filteredData = data
    .filter((item) => asianCountries.includes(item.country))
    .filter((item) => item.year == selectedYear)
    .sort((a, b) => b.total_revenue - a.total_revenue)
    .slice(0, 10);

  const maxRevenue = Math.max(
    ...filteredData.map((item) => item.total_revenue)
  );

  return (
    <div className="bg-card h-[30rem] col-span-2 shadow-md relative rounded-2xl w-full px-10 pt-10">
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="country" />
          <YAxis domain={[0, maxRevenue + 100]} />
          <Tooltip />
          <Bar
            dataKey="total_revenue"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CardAnnualCountry;
