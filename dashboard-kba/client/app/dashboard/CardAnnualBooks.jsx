import React from "react";
import { annualBooksAnalyze } from "../lib/lib";

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

const CardAnnualBooks = ({ data }) => {
  const analyzedData = annualBooksAnalyze(data);
  const maxRevenue = Math.max(...data.map((item) => item.total_books_sold));

  return (
    <div className="bg-card h-[35rem] shadow-md rounded-2xl p-4">
      <h1 className="text-text text-center font-bold text-[1.5rem] lg:text-[2rem] pt-2">
        Penjualan Tahunan
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={analyzedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
        >
          <XAxis dataKey="year" />
          <YAxis domain={[0, maxRevenue + 500]} />
          <Tooltip />
          <Bar
            dataKey="total_books_sold"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          >
            {analyzedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.category} />
            ))}
            <LabelList dataKey="total_books_sold" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CardAnnualBooks;
