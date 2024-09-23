export const years = [2021, 2022, 2023, 2024];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const asianCountries = [
  "Bangladesh",
  "China",
  "Indonesia",
  "Iran",
  "Japan",
  "Malaysia",
  "Philippines",
  "South Korea",
  "Thailand",
  "Vietnam",
];

export const monthlySalesAnalyze = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const monthName = monthNames[item.month - 1];
    if (!acc[monthName]) {
      acc[monthName] = {};
    }

    acc[monthName][item.year] = parseFloat(item.total_revenue);

    return acc;
  }, {});

  const getColor = (percentage) => {
    if (percentage > 10) return "#00b83a";
    if (percentage >= 3 && percentage <= 10) return "#b8b500";
    return "#B8001F";
  };

  const analyzedData = monthNames.map((month) => {
    const monthlyData = groupedData[month] || {};

    const percentageChange2021 = 0;
    const percentageChange2022 = monthlyData[2021]
      ? ((monthlyData[2022] - monthlyData[2021]) / monthlyData[2021]) * 100
      : 0;
    const percentageChange2023 = monthlyData[2022]
      ? ((monthlyData[2023] - monthlyData[2022]) / monthlyData[2022]) * 100
      : 0;
    const percentageChange2024 = monthlyData[2023]
      ? ((monthlyData[2024] - monthlyData[2023]) / monthlyData[2023]) * 100
      : 0;

    return {
      [month]: {
        percentageChange2021: {
          value: percentageChange2021.toFixed(2),
          color: getColor(percentageChange2021),
        },
        percentageChange2022: {
          value: percentageChange2022.toFixed(2),
          color: getColor(percentageChange2022),
        },
        percentageChange2023: {
          value: percentageChange2023.toFixed(2),
          color: getColor(percentageChange2023),
        },
        percentageChange2024: {
          value: percentageChange2024?.toFixed(2),
          color: getColor(percentageChange2024),
        },
      },
    };
  });

  return analyzedData;
};

export const annualSalesAnalyze = (data) => {
  const analyzedData = [];

  for (let i = 0; i < data.length; i++) {
    let category = "#00b83a";
    let percentageChange = 0;

    if (i > 0) {
      const currentYear = data[i].total_revenue;
      const previousYear = data[i - 1].total_revenue;

      percentageChange = ((currentYear - previousYear) / previousYear) * 100;

      if (percentageChange < 5) {
        category = "#B8001F";
      } else if (percentageChange >= 5 && percentageChange <= 15) {
        category = "#b8b500";
      } else {
        category = "#00b83a";
      }
    }

    analyzedData.push({
      year: data[i].year,
      total_revenue: data[i].total_revenue,
      percentageChange: percentageChange.toFixed(2),
      category: category,
    });
  }

  return analyzedData;
};

export const shippingMethodSalesAnalyze = (data) => {
  data.map((item) => {
    const totalMonths = item.months.size;
    const expressValue = item.Express;

    item.Express = {
      value: expressValue,
      averageQuartal: parseFloat((expressValue / totalMonths).toFixed(2)),
    };
  });

  for (let i = 1; i < data.length; i++) {
    let category = "#00b83a";
    const prevAvg = data[i - 1].Express.averageQuartal;
    const currAvg = data[i].Express.averageQuartal;

    const change = ((currAvg - prevAvg) / prevAvg) * 100;

    if (change < 3) {
      category = "#B8001F";
    } else if (change >= 3 && change <= 10) {
      category = "#b8b500";
    } else {
      category = "#00b83a";
    }

    data[i].Express.percentageChange = parseFloat(change.toFixed(2));
    data[i].Express.category = category;
  }

  data[0].Express.percentageChange = 0;
  data[0].Express.category = "#00b83a";

  return data;
};

export const annualBooksAnalyze = (data) => {
  const analyzedData = [];

  for (let i = 0; i < data.length; i++) {
    let category = "#00b83a";
    let percentageChange = 0;

    const currentSold = Number(data[i]?.total_books_sold) || 0;

    if (i > 1) {
      const previousSold1 = Number(data[i - 1]?.total_books_sold) || 0;
      const previousSold2 = Number(data[i - 2]?.total_books_sold) || 0;

      const averagePreviousSold = (previousSold1 + previousSold2) / 2;

      percentageChange =
        ((currentSold - averagePreviousSold) / averagePreviousSold) * 100;

      if (percentageChange < 3) {
        category = "#B8001F";
      } else if (percentageChange >= 3 && percentageChange <= 7) {
        category = "#b8b500";
      } else {
        category = "#00b83a";
      }
    }

    analyzedData.push({
      year: data[i].year,
      total_books_sold: data[i].total_books_sold,
      percentageChange: percentageChange.toFixed(2),
      category: category,
    });
  }
  return analyzedData;
};

export const annualCountryAnalyze = (data) => {
  const analyzedData = [];

  asianCountries.map((item) => {
    const filteredData = data.filter((entry) => entry.country === item);

    for (let i = 0; i < filteredData.length; i++) {
      let category = "#00b83a";
      let percentageChange = 0;

      const currentRevenue = parseFloat(filteredData[i]?.total_revenue || 0);

      if (i > 1) {
        const previousRevenue1 = parseFloat(
          filteredData[i - 1]?.total_revenue || 0
        );
        const previousRevenue2 = parseFloat(
          filteredData[i - 2]?.total_revenue || 0
        );

        const averagePreviousYear = (previousRevenue1 + previousRevenue2) / 2;

        percentageChange =
          ((currentRevenue - averagePreviousYear) / averagePreviousYear) * 100;

        if (percentageChange < 5) {
          category = "#B8001F";
        } else if (percentageChange >= 5 && percentageChange <= 10) {
          category = "#b8b500";
        } else {
          category = "#00b83a";
        }
      }

      analyzedData.push({
        year: filteredData[i].year,
        country: filteredData[i].country,
        total_revenue: currentRevenue,
        percentageChange: i <= 1 ? 0 : percentageChange.toFixed(2),
        category: i <= 1 ? "#00b83a" : category,
      });
    }
  });

  return analyzedData;
};
