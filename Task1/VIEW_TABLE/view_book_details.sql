CREATE OR REPLACE VIEW view_book_details AS
SELECT 
    b.book_id,
    b.title,
    b.isbn,
    b.pages,
    b.weight_in_grams,
    b.synopsis,
    b.price_in_rupiah AS price,
    b.created_at AS book_created_at,
    b.last_update AS book_last_update,
    p.publisher_name,
    p.founded_year,
    l.language_name,
    c.category_name,
    a.first_name AS author_first_name,
    a.last_name AS author_last_name,
	a.date_of_birth AS author_date_of_birth
FROM
    book b
    LEFT JOIN publisher p ON b.publisher_id = p.publisher_id
    LEFT JOIN language l ON b.language_id = l.language_id
    LEFT JOIN book_category bc ON b.book_id = bc.book_id
    LEFT JOIN category c ON bc.category_id = c.category_id
    LEFT JOIN book_author ba ON b.book_id = ba.book_id
    LEFT JOIN author a ON ba.author_id = a.author_id
ORDER BY b.book_id;
