const storeData = [
    {
        store_name: 'GRB Kaliurang',
        address: 'Jl. Kaliurang KM 5 RT 01 RW 01',
        city: 'DI Yogyakarta',
        postal_code: '55584',
        district: 'Sleman',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Thamrin',
        address: 'Jl. Thamrin No. 10',
        city: 'Jakarta Pusat',
        postal_code: '10110',
        district: 'Menteng',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Kopo',
        address: 'Jl. Kopo No. 200',
        city: 'Bandung',
        postal_code: '40231',
        district: 'Bojongloa Kaler',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Plaza Surabaya',
        address: 'Jl. Pemuda No. 27',
        city: 'Surabaya',
        postal_code: '60271',
        district: 'Genteng',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Tugu Semarang',
        address: 'Jl. Pemuda No. 150',
        city: 'Semarang',
        postal_code: '50132',
        district: 'Semarang Tengah',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Pajajaran',
        address: 'Jl. Pajajaran No. 100',
        city: 'Bogor',
        postal_code: '16143',
        district: 'Bogor Utara',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Bekasi Raya',
        address: 'Jl. Raya Bekasi No. 250',
        city: 'Bekasi',
        postal_code: '17142',
        district: 'Bekasi Timur',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Serpong',
        address: 'Jl. Raya Serpong No. 45',
        city: 'Tangerang',
        postal_code: '15326',
        district: 'Serpong',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Margonda',
        address: 'Jl. Margonda Raya No. 150',
        city: 'Depok',
        postal_code: '16424',
        district: 'Pancoran Mas',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Slamet Riyadi',
        address: 'Jl. Slamet Riyadi No. 300',
        city: 'Surakarta',
        postal_code: '57142',
        district: 'Laweyan',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Cipto Mangunkusumo',
        address: 'Jl. Cipto Mangunkusumo No. 80',
        city: 'Cirebon',
        postal_code: '45131',
        district: 'Kejaksan',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Sudirman Purwokerto',
        address: 'Jl. Jenderal Sudirman No. 75',
        city: 'Purwokerto',
        postal_code: '53116',
        district: 'Purwokerto Barat',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Gajah Mada Pekalongan',
        address: 'Jl. Gajah Mada No. 30',
        city: 'Pekalongan',
        postal_code: '51131',
        district: 'Pekalongan Barat',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB A. Yani Magelang',
        address: 'Jl. A. Yani No. 100',
        city: 'Magelang',
        postal_code: '56117',
        district: 'Magelang Selatan',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Slamet Riyadi Solo',
        address: 'Jl. Slamet Riyadi No. 150',
        city: 'Solo',
        postal_code: '57141',
        district: 'Serengan',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Pemuda Klaten',
        address: 'Jl. Pemuda No. 80',
        city: 'Klaten',
        postal_code: '57413',
        district: 'Klaten Tengah',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Juanda',
        address: 'Jl. Ir. H. Juanda No. 1',
        city: 'Bogor',
        postal_code: '16122',
        district: 'Bogor Tengah',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Diponegoro',
        address: 'Jl. Diponegoro No. 60',
        city: 'Bandung',
        postal_code: '40162',
        district: 'Cicendo',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Basuki Rahmat',
        address: 'Jl. Basuki Rahmat No. 70',
        city: 'Malang',
        postal_code: '65117',
        district: 'Klojen',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Ahmad Yani',
        address: 'Jl. Ahmad Yani No. 20',
        city: 'Mataram',
        postal_code: '83121',
        district: 'Mataram Barat',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Jakarta Pusat',
        address: 'Jl. MH Thamrin No. 1',
        city: 'Jakarta Pusat',
        postal_code: '10310',
        district: 'Menteng',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Bandung',
        address: 'Jl. Braga No. 10',
        city: 'Bandung',
        postal_code: '40111',
        district: 'Sumur Bandung',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Surabaya',
        address: 'Jl. Tunjungan No. 20',
        city: 'Surabaya',
        postal_code: '60275',
        district: 'Genteng',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Medan',
        address: 'Jl. Gatot Subroto No. 30',
        city: 'Medan',
        postal_code: '20114',
        district: 'Medan Petisah',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Denpasar',
        address: 'Jl. Teuku Umar No. 40',
        city: 'Denpasar',
        postal_code: '80113',
        district: 'Denpasar Barat',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Makassar',
        address: 'Jl. Ratulangi No. 50',
        city: 'Makassar',
        postal_code: '90135',
        district: 'Ujung Pandang',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Semarang',
        address: 'Jl. Pandanaran No. 60',
        city: 'Semarang',
        postal_code: '50241',
        district: 'Semarang Tengah',
        country: 'Indonesia'
    },
    {
        store_name: 'GRB Palembang',
        address: 'Jl. Sudirman No. 70',
        city: 'Palembang',
        postal_code: '30126',
        district: 'Ilir Timur I',
        country: 'Indonesia'
    },
];

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

const insertStore = async (store_name, address_id) => {
    const { rows } = await pool.query('INSERT INTO store (store_name, address_id) VALUES ($1, $2) RETURNING store_id', [store_name, address_id]);
    return rows[0].store_id;
}

storeData.forEach(async (store) => {
    const country = store.country;
    if (!await isCountryExistInDB(country)) {
        await insertCountry(country);
    }
    const countryId = await getCountryId(country);

    const city = store.city;
    if (!await isCityExistInDB(city)) {
        await insertCity(city, countryId);
    }
    const cityId = await getCityId(city);

    const addressId = await insertAddress(store.address, cityId, store.district, store.postal_code);

    const storeId = await insertStore(store.store_name, addressId);
    console.log(`Store ${store.store_name} inserted with ID ${storeId}`);
});