SELECT 
    b.title AS book_title,
    ol.price AS book_price,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    CONCAT(a.street_number, ' ', a.street_name, ', ', a.city) AS customer_address,
    s.method_name AS shipping_method,
    oh.status_date AS order_date
FROM 
    order_line ol
JOIN 
    book b ON ol.book_id = b.book_id
JOIN 
    cust_order co ON ol.order_id = co.order_id
JOIN 
    customer c ON co.customer_id = c.customer_id
JOIN 
    customer_address ca ON c.customer_id = ca.customer_id
JOIN 
    address a ON ca.address_id = a.address_id
JOIN 
    shipping_method s ON co.shipping_method_id = s.method_id
JOIN 
    order_history oh ON co.order_id = oh.order_id
WHERE 
    oh.status_id = 1 
    AND s.method_name = 'International'
ORDER BY
    b.title;
