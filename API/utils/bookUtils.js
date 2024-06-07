const Database = require('../config/connectDatabase');
const pool = Database.getPool();

const isCountryExistInDB = async (country) => {
    const { rows } = await pool.query('SELECT * FROM country WHERE country_name = $1', [country]);
    return rows.length > 0;
};

const getCountryId = async (country) => {
    const { rows } = await pool.query('SELECT country_id FROM country WHERE country_name = $1', [country]);
    return rows[0].country_id;
};

const insertCountry = async (country) => {
    await pool.query('INSERT INTO country (country_name) VALUES ($1)', [country]);
};

const isCityExistInDB = async (city) => {
    const { rows } = await pool.query('SELECT * FROM city WHERE city_name = $1', [city]);
    return rows.length > 0;
};

const getCityId = async (city) => {
    const { rows } = await pool.query('SELECT city_id FROM city WHERE city_name = $1', [city]);
    return rows[0].city_id;
}

const insertCity = async (city, countryId) => {
    await pool.query('INSERT INTO city (city_name, country_id) VALUES ($1, $2)', [city, countryId]);
};

const isPublisherExistInDB = async (publisherName) => {
    const { rows } = await pool.query('SELECT * FROM publisher WHERE publisher_name = $1', [publisherName]);
    return rows.length > 0;
}

const getPublisherId = async (publisherName) => {
    const { rows } = await pool.query('SELECT publisher_id FROM publisher WHERE publisher_name = $1', [publisherName]);
    return rows[0].publisher_id;
};

const insertPublisher = async (publisherName, foundedYear, cityId) => {
    await pool.query('INSERT INTO publisher (publisher_name, founded_year, city) VALUES ($1, $2, $3)', [publisherName, foundedYear, cityId]);
};

const isAuthorExistInDB = async (firstName, lastName) => {
    const { rows } = await pool.query('SELECT * FROM author WHERE first_name = $1 AND last_name = $2', [firstName, lastName]);
    return rows.length > 0;
};

const insertAuthor = async (firstName, lastName, dateOfBirth) => {
    await pool.query('INSERT INTO author (first_name, last_name, date_of_birth) VALUES ($1, $2, $3)', [firstName, lastName, dateOfBirth]);
}

const getAuthorId = async (firstName, lastName) => {
    const { rows } = await pool.query('SELECT author_id FROM author WHERE first_name = $1 AND last_name = $2', [firstName, lastName]);
    return rows[0].author_id;
};

const isCategoryExistInDB = async (category) => {
    const { rows } = await pool.query('SELECT * FROM category WHERE category_name = $1', [category]);
    return rows.length > 0;
};

const getCategoryID = async (category) => {
    const { rows } = await pool.query('SELECT category_id FROM category WHERE category_name = $1', [category]);
    return rows[0].category_id;
}

const insertCategory = async (category) => {
    await pool.query('INSERT INTO category (category_name) VALUES ($1)', [category]);
};

const isLanguageExistInDB = async (language) => {
    const { rows } = await pool.query('SELECT * FROM language WHERE language_name = $1', [language]);
    return rows.length > 0;
}

const getLanguageId = async (language) => {
    const { rows } = await pool.query('SELECT language_id FROM language WHERE language_name = $1', [language]);
    return rows[0].language_id;
}

const insertLanguage = async (language) => {
    await pool.query('INSERT INTO language (language_name) VALUES ($1)', [language]);
}

const isBookExist = async (isbn) => {
    const { rows } = await pool.query('SELECT * FROM book WHERE isbn = $1', [isbn]);
    return rows.length > 0;
}

const insertBook = async (book) => {
    const countryExist = await isCountryExistInDB(book.publisher_country);
    if (!countryExist) {
        await insertCountry(book.publisher_country);
    }
    const countryId = await getCountryId(book.publisher_country);

    const cityExist = await isCityExistInDB(book.publisher_city);
    if (!cityExist) {
        await insertCity(book.publisher_city, countryId);
    }
    const cityId = await getCityId(book.publisher_city);

    const publisherExist = await isPublisherExistInDB(book.publisher_name);

    if (!publisherExist) {
        await insertPublisher(book.publisher_name, book.publisher_founded_year, cityId);
    }
    const publisherId = await getPublisherId(book.publisher_name);

    const authorExist = await isAuthorExistInDB(book.author_first_name, book.author_last_name);
    if (!authorExist) {
        await insertAuthor(book.author_first_name, book.author_last_name, book.author_date_of_birth);
    }
    const authorId = await getAuthorId(book.author_first_name, book.author_last_name);

    const categoryExist = await isCategoryExistInDB(book.category);
    if (!categoryExist) {
        await insertCategory(book.category);
    }
    const categoryId = await getCategoryID(book.category);

    const languageExist = await isLanguageExistInDB(book.language);
    if (!languageExist) {
        await insertLanguage(book.language);
    }
    const languageId = await getLanguageId(book.language);
    // there exist db book_category and book_author
    const bookExist = await isBookExist(book.isbn);
    if (bookExist) {
        return;
    }

    // insert the book first
    const { rows } = await pool.query('INSERT INTO book (title, publisher_id, language_id, price_in_rupiah, isbn, pages, weight_in_grams, synopsis) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING book_id', [book.title, publisherId, languageId, book.price_in_rupiah, book.isbn, book.pages, book.weight_in_grams, book.synopsis]);
    const bookId = rows[0].book_id;

    // insert into book_author
    await pool.query('INSERT INTO book_author (book_id, author_id) VALUES ($1, $2)', [bookId, authorId]);

    // insert into book_category
    await pool.query('INSERT INTO book_category (book_id, category_id) VALUES ($1, $2)', [bookId, categoryId]);

    return bookId;
};

module.exports = { insertBook };