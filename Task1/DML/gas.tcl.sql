-- Start a transaction
BEGIN;

-- Update harga buku
UPDATE book
SET price_in_rupiah = 450000
WHERE book_id = 1;

-- Update jumlah halaman buku
UPDATE book
SET pages = 5000
WHERE book_id = 1;

ROLLBACK;
-- Commit the transaction
COMMIT;

