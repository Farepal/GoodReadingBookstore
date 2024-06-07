CREATE OR REPLACE VIEW view_customer_wishlists_with_books AS
SELECT
    c.customer_id,
    c.username,
    c.first_name,
    c.last_name,
    c.email,
    c.created_at AS customer_created_at,
    c.last_update AS customer_last_update,
    w.wishlist_id,
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
    i.inventory_id,
    i.quantity AS available_quantity,
    s.store_id,
    s.store_name,
    a.address_name AS store_address,
    a.district AS store_district,
    a.postal_code AS store_postal_code,
    ct.city_name AS store_city,
    co.country_name AS store_country,
    addr.address_name AS customer_address,
    addr.district AS customer_district,
    addr.postal_code AS customer_postal_code,
    city.city_name AS customer_city,
    country.country_name AS customer_country,
	cl.customer_location_id
FROM
    customer c
    JOIN wishlist w ON c.customer_id = w.customer_id
    JOIN inventory i ON w.inventory_id = i.inventory_id
    JOIN store s ON i.store_id = s.store_id
    JOIN address a ON s.address_id = a.address_id
    JOIN city ct ON a.city_id = ct.city_id
    JOIN country co ON ct.country_id = co.country_id
    JOIN view_book_details bd ON i.book_id = bd.book_id
    LEFT JOIN customer_location cl ON c.customer_id = cl.customer_id
    LEFT JOIN address addr ON cl.address_id = addr.address_id
    LEFT JOIN city ON addr.city_id = city.city_id
    LEFT JOIN country ON city.country_id = country.country_id
ORDER BY c.customer_id, addr.address_id;
