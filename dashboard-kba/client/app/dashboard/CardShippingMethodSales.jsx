import React from "react";
import { PieChart, Pie, ResponsiveContainer, BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip } from "recharts";

// const data = [
//   { method_name: "Standard Shipping", total_revenue: 4000 },
//   { method_name: "Express Shipping", total_revenue: 3000 },
//   { method_name: "Same-day Delivery", total_revenue: 2000 },
//   { method_name: "Next-day Delivery", total_revenue: 2780 },
// ];

const CardShippingMethodSales = ({data}) => {

  const filteredData = data.filter((item) => item.method_name === "Express").filter((item) => item.year === 2023);
  const maxRevenue = Math.max(...data.map((item) => item.total_revenue));

  // console.log(filteredData)
  return (
    <div className="bg-card h-[30rem] shadow-md rounded-2xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={filteredData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="year" />
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
    // <div className="bg-card h-[30rem] shadow-md rounded-2xl">
    //   <ResponsiveContainer width="100%" height="100%">
    //     <PieChart width={300} height={300}>
    //       <Pie
    //         data={filteredData}
    //         dataKey="total_revenue"
    //         nameKey="method_name"
    //         cx="50%"
    //         cy="50%"
    //         outerRadius={120}
    //         fill="#82ca9d"
    //         label
    //       />
    //     </PieChart>
    //   </ResponsiveContainer>
    // </div>
  );
};

export default CardShippingMethodSales;
