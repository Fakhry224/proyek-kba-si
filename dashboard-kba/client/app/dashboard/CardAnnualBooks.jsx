import React from 'react'
import { ResponsiveContainer,PieChart,Pie } from 'recharts'

const CardAnnualBooks = ({data}) => {
  return (
    <div className="bg-card h-[30rem] shadow-md rounded-2xl">
       <ResponsiveContainer width="100%" height="100%">
         <PieChart width={300} height={300}>
           <Pie
            data={data}
            dataKey="total_books_sold"
            nameKey="year"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CardAnnualBooks