CREATE OR REPLACE VIEW view_store_details AS
SELECT
    st.store_id,
    st.store_name,
    ad.address_name AS store_address,
    ad.district AS store_district,
    ad.postal_code AS store_postal_code,
    ct.city_name AS store_city,
    co.country_name AS store_country,
    i.inventory_id,
    i.quantity AS available_quantity,
    i.shelf_location,
    bd.book_id,
    bd.title AS book_title,
    bd.isbn,
    bd.pages,
    bd.weight_in_grams,
    bd.synopsis,
    bd.price,
    bd.book_created_at,
    bd.book_last_update,
    bd.publisher_name,
    bd.founded_year,
    bd.language_name,
    bd.category_name,
    bd.author_first_name,
    bd.author_last_name,
    bd.author_date_of_birth,
    s.staff_id,
    s.first_name AS staff_first_name,
    s.last_name AS staff_last_name,
    s.email AS staff_email
FROM
    store st
    JOIN address ad ON st.address_id = ad.address_id
    JOIN city ct ON ad.city_id = ct.city_id
    JOIN country co ON ct.country_id = co.country_id
    JOIN inventory i ON st.store_id = i.store_id
    JOIN view_book_details bd ON i.book_id = bd.book_id
    LEFT JOIN staff s ON st.store_id = s.store_id
ORDER BY
    st.store_name, bd.title;
