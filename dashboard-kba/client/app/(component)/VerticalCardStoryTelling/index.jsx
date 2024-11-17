import React from "react";
import { annualBooksAnalyze } from "@/app/lib/lib";

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
            <p style={{ color: "#000" }}>{`${item.name}: ${item.value}`}</p>
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

const VerticalCardStoryTelling = ({ data }) => {
  const analyzedData = annualBooksAnalyze(data);
  const maxRevenue = Math.max(...data.map((item) => item.total_books_sold));

  return (
    <div className="bg-card h-[35rem] shadow-md rounded-2xl p-4 mt-10">
      <div className="flex-col gap-5 h-[100%]">
        <h1 className="text-text text-center font-bold text-[1.5rem] lg:text-[2rem] pt-2 mb-6">
          Pendapatan Tahunan
        </h1>
        <div
          className="flex-row gap-2"
          style={{ height: "100%", width: "100%" }}
        >
          <div className="flex-row justify-center items-center my-auto">
            <h1 className="text-black text-xl font-bold">
              Ringkasan Penjualan Tahunan Gravity Bookstore Tahun 2021-2024
            </h1>
            <br />
            <p className="text-black text-lg">
              Semoga hari Anda menyenangkan! <br />
              Berikut ini adalah kinerja penjualan tahunan Gravity Bookstore
              dari 2021 hingga 2024 : <br />
              <br />
              Penjualan Gravity Bookstore meningkat dari 1.757 buku pada 2021
              menjadi 2.384 pada 2022. Lalu pada 2023 terjual sebanyak 2349 buku
              dan puncak penurunan signifikan pada 2024 dengan 627 buku terjual.
              <br />
              <br />
              Nantikan kabar terbaru tentang bagaimana Gravity Bookstore
              berencana untuk mengatasi penurunan penjualan ini dalam beberapa
              bulan mendatang!
            </p>
          </div>
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
              <Bar
                dataKey="total_revenue"
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
      </div>
    </div>
  );
};

export default VerticalCardStoryTelling;
