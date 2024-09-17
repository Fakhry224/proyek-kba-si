import React from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const data = [
  { method_name: "Standard Shipping", total_revenue: 4000 },
  { method_name: "Express Shipping", total_revenue: 3000 },
  { method_name: "Same-day Delivery", total_revenue: 2000 },
  { method_name: "Next-day Delivery", total_revenue: 2780 },
];

const CardShippingMethodSales = () => {
  return (
    <div className="bg-card h-[30rem] shadow-md rounded-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="total_revenue"
            nameKey="method_name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CardShippingMethodSales;
