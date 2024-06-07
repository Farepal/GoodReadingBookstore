CREATE OR REPLACE VIEW view_inventory_details AS
SELECT
    i.inventory_id,
    i.book_id,
    bd.title AS book_title,
    bd.isbn,
    bd.pages,
    bd.weight_in_grams,
    bd.synopsis,
    bd.price,
    bd.publisher_name,
    bd.founded_year,
    bd.language_name,
    bd.category_name,
    bd.author_first_name,
    bd.author_last_name,
    bd.author_date_of_birth,
    i.store_id,
    st.store_name,
    st.address_id,  -- Consider joining with the Address table for complete address details if needed
    i.quantity AS available_quantity,
    i.shelf_location,
    i.created_at AS inventory_created_at,
    i.last_update AS inventory_last_update
FROM
    inventory i
    JOIN view_book_details bd ON i.book_id = bd.book_id
    JOIN store st ON i.store_id = st.store_id
ORDER BY
    bd.title, st.store_name, i.shelf_location;
