import React from "react";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CardAnnualSales = ({ data }) => {
  const maxRevenue = Math.max(...data.map((item) => item.total_revenue));

  return (
    <div className="bg-card h-[30rem] shadow-md rounded-2xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="year" />
          <YAxis domain={[0, maxRevenue + 5000]} />
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

export default CardAnnualSales;
