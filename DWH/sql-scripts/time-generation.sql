SET @@cte_max_recursion_depth = 1500;
INSERT INTO time (year, month, day)
WITH RECURSIVE DateSequence AS (
    SELECT '2021-01-01' AS date
    UNION ALL
    SELECT DATE_ADD(date, INTERVAL 1 DAY)
    FROM DateSequence
    WHERE date < '2024-12-31'
)
SELECT
    YEAR(date) AS year,
    MONTH(date) AS month,
    DAY(date) AS day
FROM DateSequence;