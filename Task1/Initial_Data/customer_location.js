require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Ganti dengan username PostgreSQL Anda
  host: 'localhost',
  database: 'GoodReadingBookstore', // Ganti dengan nama database Anda
  password: process.env.password, // Ganti dengan password untuk database
  port: 5432, // Port default PostgreSQL
});

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

const insertAddress = async (address_name, city_id, district, postal_code) => {
    const { rows } = await pool.query('INSERT INTO address (address_name, city_id, district, postal_code) VALUES ($1, $2, $3, $4) RETURNING address_id', [address_name, city_id, district, postal_code]);
    return rows[0].address_id;
};

const insertCustomer_location = async (customer_id, address_id) => {
    await pool.query('INSERT INTO customer_location (customer_id, address_id) VALUES ($1, $2)', [customer_id, address_id]);
}

    //     address: 'Jl. Sudirman No. 70',
    //     city: 'Palembang',
    //     postal_code: '30126',
    //     district: 'Ilir Timur I',
    //     country: 'Indonesia'
    // },

const addressData = [
    { customer_id: 73, address: 'Jl. Gatot Subroto No. 12', city: 'Jakarta', postal_code: '12930', district: 'Cengkareng', country: 'Indonesia' },
    { customer_id: 74, address: 'Jl. Sudirman No. 70', city: 'Palembang', postal_code: '30126', district: 'Ilir Timur I', country: 'Indonesia' },
    { customer_id: 75, address: '123 Main St', city: 'New York', postal_code: '10001', district: 'Manhattan', country: 'United States' },
    { customer_id: 76, address: 'Calle Mayor 23', city: 'Madrid', postal_code: '28013', district: 'Centro', country: 'Spain' },
    { customer_id: 77, address: 'Champ de Mars 5', city: 'Paris', postal_code: '75007', district: '7th Arrondissement', country: 'France' },
    { customer_id: 78, address: 'Soi Sukhumvit 24', city: 'Bangkok', postal_code: '10110', district: 'Khlong Toei', country: 'Thailand' },
    { customer_id: 79, address: 'Rua Augusta 144', city: 'Lisbon', postal_code: '1100-053', district: 'Santa Maria Maior', country: 'Portugal' },
    { customer_id: 80, address: 'Corso Venezia 12', city: 'Milan', postal_code: '20121', district: 'Centro Storico', country: 'Italy' },
    { customer_id: 81, address: 'Bahnhofstrasse 45', city: 'Zurich', postal_code: '8001', district: 'Kreis 1', country: 'Switzerland' },
    { customer_id: 82, address: 'Karanganyar No. 12', city: 'Surabaya', postal_code: '60175', district: 'Gubeng', country: 'Indonesia' },
    { customer_id: 83, address: 'Jl. Veteran No. 23', city: 'Semarang', postal_code: '50241', district: 'Semarang Tengah', country: 'Indonesia' },
    { customer_id: 84, address: 'Jl. Bali No. 45', city: 'Denpasar', postal_code: '80113', district: 'Denpasar Utara', country: 'Indonesia' },
    { customer_id: 85, address: 'Königsallee 14', city: 'Düsseldorf', postal_code: '40212', district: 'Stadtmitte', country: 'Germany' },
    { customer_id: 86, address: 'Oxford Street 125', city: 'London', postal_code: 'W1D 2QR', district: 'West End', country: 'United Kingdom' },
    { customer_id: 87, address: 'Narodni 23', city: 'Prague', postal_code: '110 00', district: 'Prague 1', country: 'Czech Republic' },
    { customer_id: 88, address: 'Tverskaya Street 6', city: 'Moscow', postal_code: '125009', district: 'Tverskoy District', country: 'Russia' },
    { customer_id: 89, address: 'Orchard Road 238', city: 'Singapore', postal_code: '238851', district: 'Orchard', country: 'Singapore' },
    { customer_id: 90, address: 'Pitt Street 18', city: 'Sydney', postal_code: 'NSW 2000', district: 'CBD', country: 'Australia' },
    { customer_id: 91, address: 'Jl. Diponegoro No. 67', city: 'Yogyakarta', postal_code: '55121', district: 'Yogyakarta', country: 'Indonesia' },
    { customer_id: 92, address: 'Jl. Perintis Kemerdekaan No. 32', city: 'Makassar', postal_code: '90111', district: 'Tamalate', country: 'Indonesia' },
    { customer_id: 93, address: 'Jl. Ir. H. Juanda No. 27', city: 'Bandung', postal_code: '40115', district: 'Cidadap', country: 'Indonesia' },
    { customer_id: 94, address: 'Jl. Pemuda No. 45', city: 'Bekasi', postal_code: '17113', district: 'Bekasi Utara', country: 'Indonesia' },
    { customer_id: 95, address: 'Jl. Sisingamangaraja No. 12', city: 'Medan', postal_code: '20217', district: 'Medan Kota', country: 'Indonesia' },
    { customer_id: 96, address: 'Calle Alcalá 23', city: 'Barcelona', postal_code: '08007', district: 'Eixample', country: 'Spain' },
    { customer_id: 97, address: 'Via del Corso 89', city: 'Rome', postal_code: '00186', district: 'Centro Storico', country: 'Italy' },
    { customer_id: 98, address: 'Jl. Pangeran Antasari No. 56', city: 'Banjarmasin', postal_code: '70111', district: 'Banjarmasin Tengah', country: 'Indonesia' },
    { customer_id: 99, address: 'Orchard Road 123', city: 'Singapore', postal_code: '238859', district: 'Orchard', country: 'Singapore' },
    { customer_id: 100, address: 'Jl. Veteran No. 45', city: 'Malang', postal_code: '65145', district: 'Klojen', country: 'Indonesia' },
    { customer_id: 101, address: 'Jl. Pangeran Diponegoro No. 78', city: 'Surakarta', postal_code: '57111', district: 'Banjarsari', country: 'Indonesia' },
    { customer_id: 102, address: 'Jl. Gajah Mada No. 23', city: 'Jember', postal_code: '68111', district: 'Kaliwates', country: 'Indonesia' },
    { customer_id: 103, address: 'Jl. Yos Sudarso No. 67', city: 'Balikpapan', postal_code: '76111', district: 'Balikpapan Utara', country: 'Indonesia' },
    { customer_id: 104, address: 'Jl. Raya Bogor No. 45', city: 'Depok', postal_code: '16411', district: 'Beji', country: 'Indonesia' },
    { customer_id: 105, address: 'Jl. Pemuda No. 23', city: 'Cirebon', postal_code: '45121', district: 'Kejaksan', country: 'Indonesia' },
    { customer_id: 106, address: 'Jl. Raya Serang No. 67', city: 'Tangerang', postal_code: '15111', district: 'Tangerang Kota', country: 'Indonesia' },
    { customer_id: 107, address: 'Jl. Sultan Agung No. 12', city: 'Pekalongan', postal_code: '51122', district: 'Pekalongan Utara', country: 'Indonesia' },
    { customer_id: 108, address: 'Jl. Panglima Sudirman No. 89', city: 'Purbalingga', postal_code: '53312', district: 'Purbalingga', country: 'Indonesia' },
    { customer_id: 109, address: 'Jl. Raya Tlogomas No. 45', city: 'Malang', postal_code: '65145', district: 'Lowokwaru', country: 'Indonesia' },
    { customer_id: 110, address: 'Calle del Prado 23', city: 'Seville', postal_code: '41001', district: 'Casco Antiguo', country: 'Spain' },
    { customer_id: 111, address: 'Markt 67', city: 'Amsterdam', postal_code: '1012 XK', district: 'Centrum', country: 'Netherlands' },
    { customer_id: 112, address: 'Jl. Tanjung Pura No. 23', city: 'Pontianak', postal_code: '78111', district: 'Pontianak Kota', country: 'Indonesia' },
];

const gas = async () => {
    for (let i = 0; i < addressData.length; i++)
    {
        const { customer_id, address, city, postal_code, district, country } = addressData[i];
        if (!await isCountryExistInDB(country))
        {
            await insertCountry(country);
        }
        const countryId = await getCountryId(country);

        if (!await isCityExistInDB(city))
        {
            await insertCity(city, countryId);
        }
        const cityId = await getCityId(city);

        const address_id = await insertAddress(address, cityId, district, postal_code);
        await insertCustomer_location(customer_id, address_id);
    }
};

gas().then(() => {
    console.log('Success');
    pool.end();
}
).catch((err) => {
    console.error(err);
    pool.end();
});