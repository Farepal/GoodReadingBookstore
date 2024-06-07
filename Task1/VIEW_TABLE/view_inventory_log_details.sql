CREATE OR REPLACE VIEW view_inventory_log_details AS
SELECT
    il.inventory_log_id,
    il.inventory_id,
    i.book_id,
    bd.title AS book_title,
    bd.isbn,
    i.store_id,
    st.store_name,
    il.quantity AS quantity_change,
    il.updated_by AS staff_id,
    s.email AS staff_email,
    il.created_at AS log_created_at
FROM
    inventory_log il
    JOIN inventory i ON il.inventory_id = i.inventory_id
    JOIN view_book_details bd ON i.book_id = bd.book_id
    JOIN store st ON i.store_id = st.store_id
    JOIN staff s ON il.updated_by = s.staff_id
ORDER BY
    il.created_at DESC;
