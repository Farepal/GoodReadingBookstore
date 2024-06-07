const Database = require('../config/connectDatabase');
const pool = Database.getPool();
const { insertBook } = require('../utils/bookUtils');
// view_book_details
const allBooks = async (req, res, next) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }

    async function getAllBooks() {
        const queryText = 'SELECT * FROM view_book_details';
        const { rows } = await pool.query(queryText);
        return rows;
    }
}

const oneBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        if (!bookId)
            return res.status(400).json({ message: 'Book ID is required' });

        const book = await getBookById(bookId);
        res.status(200).json(book);

    } catch (error) {
        next(error);
    }

    async function getBookById(bookId) {
        const queryText = 'SELECT * FROM view_book_details WHERE book_id = $1';
        const { rows } = await pool.query(queryText, [bookId]);
        return rows[0];
    }
}

// {
//     title: 'The Great Gatsby',
//     publisher_name: 'Scribner',
//     publisher_founded_year: 1846,
//     publisher_city: 'New York',
//     publisher_country: 'United States',
//     language: 'English',
//     price_in_rupiah: 150000,
//     isbn: '9780743273565',
//     pages: 180,
//     weight_in_grams: 200,
//     synopsis: 'The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story is of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted “gin was the national drink',
//     author_first_name: 'F. Scott',
//     author_last_name: 'Fitzgerald',
//     author_date_of_birth: '1896-09-24',
//     category: 'Fiction'
// }

const addBook = async (req, res, next) => {
    try {
        const book = req.body;
        if (!book.title || !book.publisher_name || !book.publisher_founded_year || !book.publisher_city || !book.publisher_country || !book.language || !book.price_in_rupiah || !book.isbn || !book.pages || !book.weight_in_grams || !book.synopsis || !book.author_first_name || !book.author_last_name || !book.author_date_of_birth || !book.category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const bookId = await insertBook(book);

        if (!bookId) {
            return res.status(400).json({ message: 'Book not inserted' });
        }
        res.status(201).json({ message: 'Book inserted successfully' });
    } catch (error) {
        next(error);
    };
}

module.exports = { allBooks, addBook, oneBook };