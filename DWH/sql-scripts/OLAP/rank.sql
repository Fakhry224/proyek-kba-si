SELECT
    t.year,
    t.month,
    c.customer_id,
    b.title,
    sm.method_name,
    bsf.revenue_book_sales,
    RANK() OVER (PARTITION BY t.year, t.month ORDER BY bsf.revenue_book_sales DESC) AS sales_rank
FROM
    book_sales_facts bsf
JOIN
    time t ON bsf.time_sk = t.time_sk
JOIN
    customer c ON bsf.customer_sk = c.customer_sk
JOIN
    book b ON bsf.book_sk = b.book_sk
JOIN
    shipping_method sm ON bsf.method_sk = sm.method_sk
WHERE t.year = 2021
ORDER BY
    t.year,
    t.month,
    sales_rank;
