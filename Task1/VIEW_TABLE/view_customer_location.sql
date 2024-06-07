CREATE OR REPLACE VIEW view_customer_location AS
SELECT
    c.customer_id,
    c.username,
    c.first_name,
    c.last_name,
    c.email,
    c.created_at AS customer_created_at,
    c.last_update AS customer_last_update,
    cl.customer_location_id,
    addr.address_id,
    addr.address_name,
    addr.district,
    addr.postal_code,
    city.city_name,
    country.country_name
FROM
    customer c
    JOIN customer_location cl ON c.customer_id = cl.customer_id
    JOIN address addr ON cl.address_id = addr.address_id
    JOIN city ON addr.city_id = city.city_id
    JOIN country ON city.country_id = country.country_id
ORDER BY
    c.customer_id, addr.address_id;
