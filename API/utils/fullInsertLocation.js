const Database = require('../config/connectDatabase');
const pool = Database.getPool();

const isCountryExistInDB = async (country) => {
    const { rows } = await pool.query('SELECT * FROM country WHERE country_name = $1', [country]);
    return rows.length > 0;
}

const getCountryId = async (country) => {
    const { rows } = await pool.query('SELECT country_id FROM country WHERE country_name = $1', [country]);
    return rows[0].country_id;
}

const insertCountry = async (country) => {
    await pool.query('INSERT INTO country (country_name) VALUES ($1)', [country]);
}

const isCityExistInDB = async (city) => {
    const { rows } = await pool.query('SELECT * FROM city WHERE city_name = $1', [city]);
    return rows.length > 0;
}

const getCityId = async (city) => {
    const { rows } = await pool.query('SELECT city_id FROM city WHERE city_name = $1', [city]);
    return rows[0].city_id;
}

const insertCity = async (city, countryId) => {
    await pool.query('INSERT INTO city (city_name, country_id) VALUES ($1, $2)', [city, countryId]);
}

const insertAddress = async (address_name, city_id, district, postal_code) => {
    const { rows } = await pool.query('INSERT INTO address (address_name, city_id, district, postal_code) VALUES ($1, $2, $3, $4) RETURNING address_id', [address_name, city_id, district, postal_code]);
    return rows[0].address_id;
}

const fullInsertAddress = async (customer_id, address, city, postal_code, district, country) => {
    if (!await isCountryExistInDB(country)) {
        await insertCountry(country);
    }
    const country_id = await getCountryId(country);

    if (!await isCityExistInDB(city)) {
        await insertCity(city, country_id);
    }
    const city_id = await getCityId(city);

    const address_id = await insertAddress(address, city_id, district, postal_code);

    return address_id;
}

const fullInsertCity = async (city, country) => {
    if (!await isCountryExistInDB(country)) {
        await insertCountry(country);
    }
    const country_id = await getCountryId(country);

    if (!await isCityExistInDB(city)) {
        await insertCity(city, country_id);
    }
}

module.exports = { fullInsertAddress, fullInsertCity };