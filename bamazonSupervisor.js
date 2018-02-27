/*
View Product Sales by Department qry:
SELECT
department_id,
d.department_name,
    product_sales,
    over_head_costs,
    (product_sales - over_head_costs) as 'total_profit'
FROM
    (SELECT SUM(subtotal) AS 'product_sales', department_name FROM(
        SELECT price * product_sales AS 'subtotal', department_name FROM bamazon.products) sub GROUP BY department_name) sub2
INNER JOIN bamazon.departments d on sub2.department_name = d.department_name;

*/