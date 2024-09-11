SELECT t.year, t.month, SUM(b.revenue_book_sales) AS total_sales
FROM book_sales_facts b 
JOIN time t ON b.time_sk = t.time_sk
GROUP BY t.year, t.month WITH ROLLUP;
