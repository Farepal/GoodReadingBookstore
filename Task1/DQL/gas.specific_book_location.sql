CREATE VIEW specific_book_location AS
SELECT 
    s.store_name,
    b.title,
    i.shelf_location,
    b.isbn,
    i.quantity
FROM store s
JOIN inventory i ON s.store_id = i.store_id
JOIN book b ON b.book_id = i.book_id;
