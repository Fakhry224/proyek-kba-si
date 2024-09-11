SELECT ROW_NUMBER() OVER (ORDER BY total_revenue DESC) AS Number, Customer, total_revenue AS TotalRevenue
FROM ( SELECT c.name AS Customer, SUM(bsf.revenue_book_sales) AS total_revenue
    FROM book_sales_facts bsf
    JOIN customer c ON bsf.customer_sk = c.customer_sk
    GROUP BY c.name) AS revenue_per_customer
ORDER BY Number;
