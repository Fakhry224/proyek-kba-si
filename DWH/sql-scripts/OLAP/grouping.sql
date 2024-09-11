select
	if (grouping(t.year), 'All Years', t.year) as Year,
	if (grouping(c.country), 'All Countries', c.country) as Country,
	if (grouping(b.title), 'All Books', b.title) as Book,
	if (grouping(s.method_name), 'All Shippings', s.method_name) as Shipping,
	sum(bsf.revenue_book_sales) as Revenue
from
	book_sales_facts bsf,
	customer c,
	book b,
	shipping_method s,
	time t
where
	c.customer_sk = bsf.customer_sk and
	b.book_sk = bsf.book_sk and
	s.method_sk = bsf.method_sk and
	t.time_sk = bsf.time_sk
group by
	c.country,
	t.year,
	s.method_name,
	b.title with rollup
having
	Country = 'Indonesia' and
	grouping(b.title) and
	not (grouping(t.year) or
     	grouping(s.method_name));