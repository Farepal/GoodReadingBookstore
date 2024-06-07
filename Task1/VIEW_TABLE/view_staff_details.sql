CREATE OR REPLACE VIEW view_staff_details AS
SELECT
    s.staff_id,
    s.email,
    s.password,  -- Assuming you're okay with including it since it's a personal project.
    s.created_at AS staff_created_at,
    s.last_update AS staff_last_update,
    st.store_id,
    st.store_name,
    a.address_name AS store_address,
    a.district AS store_district,
    a.postal_code AS store_postal_code,
    ct.city_name AS store_city,
    co.country_name AS store_country
FROM
    staff s
    JOIN store st ON s.store_id = st.store_id
    JOIN address a ON st.address_id = a.address_id
    JOIN city ct ON a.city_id = ct.city_id
    JOIN country co ON ct.country_id = co.country_id
ORDER BY s.staff_id;
