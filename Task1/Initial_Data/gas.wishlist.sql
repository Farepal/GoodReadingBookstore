INSERT INTO wishlist (customer_id, inventory_id)
SELECT customer_id, inventory_id
FROM (
    SELECT
        customer_id,
        inventory_id
    FROM
        generate_series(74, 112) AS customer_id
        CROSS JOIN generate_series(1, 156) AS inventory_id
    EXCEPT
    SELECT
        customer_id,
        inventory_id
    FROM
        wishlist
) AS new_combinations
ORDER BY RANDOM()
LIMIT 1000;