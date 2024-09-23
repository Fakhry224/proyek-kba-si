import React, { useEffect, useState } from "react";
import { monthlySalesAnalyze } from "../lib/lib.js";
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

const prepareChartData = (monthlySalesRaw, analyzedData) => {
  const chartData = [];

  for (let month = 1; month <= 12; month++) {
    const monthData = { month: monthNames[month - 1] };

    monthlySalesRaw.forEach((item) => {
      if (item.month === month) {
        monthData[`year_${item.year}`] = parseFloat(item.total_revenue);
      }
    });

    const analyzedMonth = analyzedData.find(
      (data) => data[monthNames[month - 1]]
    );
    if (analyzedMonth) {
      const monthKey = monthNames[month - 1];
      monthData[`percentageChange2021`] =
        analyzedMonth[monthKey].percentageChange2021;
      monthData[`percentageChange2022`] =
        analyzedMonth[monthKey].percentageChange2022;
      monthData[`percentageChange2023`] =
        analyzedMonth[monthKey].percentageChange2023;
      monthData[`percentageChange2024`] =
        analyzedMonth[monthKey].percentageChange2024;
    }

    chartData.push(monthData);
  }

  return chartData;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    console.log(data);

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
        >{`Month: ${label}`}</p>
        <br />
        {payload.map((item) => (
          <p key={item.name} style={{ color: item.stroke }}>
            {`${item.name}: $${item.value.toFixed(2)} `}
          </p>
        ))}
        <br />
        <p
          style={{ color: data.percentageChange2021.color }}
        >{`Percentage Change 2021: ${data.percentageChange2021.value}%`}</p>
        <p
          style={{ color: data.percentageChange2022.color }}
        >{`Percentage Change 2022: ${data.percentageChange2022.value}%`}</p>
        <p
          style={{ color: data.percentageChange2023.color }}
        >{`Percentage Change 2023: ${data.percentageChange2023.value}%`}</p>
        <p
          style={{ color: data.percentageChange2024.color }}
        >{`Percentage Change 2024: ${data.percentageChange2024.value}%`}</p>
      </div>
    );
  }
  return null;
};

const CardMonthlySales = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const analyzedData = monthlySalesAnalyze(data);

  useEffect(() => {
    if (data && analyzedData) {
      const processedData = prepareChartData(data, analyzedData);
      setChartData(processedData);
    }
  }, [data, analyzedData]);

  return (
    <div className="bg-card w-full shadow-md rounded-2xl p-4 h-[35rem] mt-10">
      <h1 className="text-text text-center font-bold text-[1.5rem] lg:text-[2rem] pt-2">
        Pendapatan Bulanan
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 90, right: 30, left: 10, bottom: 15 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              marginLeft: "20px",
            }}
          />
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
