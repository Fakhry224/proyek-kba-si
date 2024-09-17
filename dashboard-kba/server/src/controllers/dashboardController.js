import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const getDashboardMetrics = async (req, res) => {
  try {
    // const annualBooksRaw = await prisma.$queryRaw`
    //     SELECT t.year, COUNT(bsf.book_sk) AS total_books_sold
    //     FROM book_sales_facts bsf
    //     JOIN time t ON bsf.time_sk = t.time_sk
    //     GROUP BY t.year
    //     ORDER BY t.year;
    // `;

    const annualSalesRaw = await prisma.$queryRaw`
        SELECT t.year, SUM(bsf.revenue_book_sales) AS total_revenue
        FROM book_sales_facts bsf
        JOIN time t ON bsf.time_sk = t.time_sk
        GROUP BY t.year
        ORDER BY t.year;
    `;

    const monthlySalesRaw = await prisma.$queryRaw`
        SELECT t.year, t.month, SUM(bsf.revenue_book_sales) AS total_revenue
        FROM book_sales_facts bsf
        JOIN time t ON bsf.time_sk = t.time_sk
        GROUP BY t.year, t.month
        ORDER BY t.year, t.month;
    `;

    // const shippingMethodSalesRaw = await prisma.$queryRaw`
    //     SELECT t.year, t.month, sm.method_name, SUM(bsf.revenue_book_sales) AS total_revenue
    //     FROM book_sales_facts bsf
    //     JOIN time t ON bsf.time_sk = t.time_sk
    //     JOIN shipping_method sm ON bsf.method_sk = sm.method_sk
    //     GROUP BY t.year, t.month, sm.method_name
    //     ORDER BY t.year, t.month, sm.method_name;
    // `;

    const countrySalesRaw = await prisma.$queryRaw`
        SELECT t.year, c.country, SUM(bsf.revenue_book_sales) AS total_revenue
        FROM book_sales_facts bsf
        JOIN time t ON bsf.time_sk = t.time_sk
        JOIN customer c ON bsf.customer_sk = c.customer_sk
        GROUP BY t.year, c.country
        ORDER BY t.year, c.country
    `;

    // const tess = await prisma.book.findMany({
    //   take: 5,
    // });

    // const tesRaw = tess.map((tes) => ({
    //   ...tes,
    //   book_sk: tes.book_sk.toString(),
    // }));

    res.json({
      // annualBooksRaw,
      annualSalesRaw,
      monthlySalesRaw,
      // shippingMethodSalesRaw,
      countrySalesRaw,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
