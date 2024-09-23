import React from "react";
import { annualSalesAnalyze } from "../lib/lib";

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
        >{`${label}`}</p>
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

const CardAnnualSales = ({ data }) => {
  const analyzedData = annualSalesAnalyze(data);
  const maxRevenue = Math.max(...data.map((item) => item.total_revenue));

  return (
    <div className="bg-card shadow-md rounded-2xl p-4 h-[35rem] mt-10">
      <h1 className="text-text text-center font-bold text-[1.5rem] lg:text-[2rem] pt-2">
        Pendapatan Tahunan
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={analyzedData}
          margin={{ top: 90, right: 30, left: 20, bottom: 15 }}
        >
          <XAxis dataKey="year" />
          <YAxis domain={[0, maxRevenue + 2000]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total_revenue" activeBar={<Rectangle stroke="blue" />}>
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

export default CardAnnualSales;
