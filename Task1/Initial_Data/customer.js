require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Ganti dengan username PostgreSQL Anda
  host: 'localhost',
  database: 'GoodReadingBookstore', // Ganti dengan nama database Anda
  password: process.env.password, // Ganti dengan password untuk database
  port: 5432, // Port default PostgreSQL
});

const customers = [
    {
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: '#Johndoe123',
        first_name: 'John',
        last_name: 'Doe',
    },
    {
        username: 'janedoe',
        email: 'janedoe@gmail.com',
        password: 'Jane@Doe2023',
        first_name: 'Jane',
        last_name: 'Doe',
    },
    {
        username: 'alicewonder',
        email: 'alicewonder@gmail.com',
        password: 'Alice!2023Wonder',
        first_name: 'Alice',
        last_name: 'Wonder',
    },
    {
        username: 'bobbuilder',
        email: 'bobbuilder@gmail.com',
        password: 'Bob#Builder2023',
        first_name: 'Bob',
        last_name: 'Builder',
    },
    {
        username: 'charliebrown',
        email: 'charliebrown@gmail.com',
        password: 'Charlie$2023Brown',
        first_name: 'Charlie',
        last_name: 'Brown',
    },
    {
        username: 'davidtennant',
        email: 'davidtennant@gmail.com',
        password: 'David@Tennant2023',
        first_name: 'David',
        last_name: 'Tennant',
    },
    {
        username: 'emmawatson',
        email: 'emmawatson@gmail.com',
        password: 'Emma#Watson2023',
        first_name: 'Emma',
        last_name: 'Watson',
    },
    {
        username: 'frankcastle',
        email: 'frankcastle@gmail.com',
        password: 'Frank!Castle2023',
        first_name: 'Frank',
        last_name: 'Castle',
    },
    {
        username: 'georgemichael',
        email: 'georgemichael@gmail.com',
        password: 'George$Michael2023',
        first_name: 'George',
        last_name: 'Michael',
    },
    {
        username: 'harrypotter',
        email: 'harrypotter@gmail.com',
        password: 'Harry@Potter2023',
        first_name: 'Harry',
        last_name: 'Potter',
    },
    {
        username: 'ireneadler',
        email: 'ireneadler@gmail.com',
        password: 'Irene#Adler2023',
        first_name: 'Irene',
        last_name: 'Adler',
    },
    {
        username: 'jackryan',
        email: 'jackryan@gmail.com',
        password: 'Jack!Ryan2023',
        first_name: 'Jack',
        last_name: 'Ryan',
    },
    {
        username: 'jackryan',
        email: 'jackryan@gmail.com',
        password: 'Jack!Ryan2023',
        first_name: 'Jack',
        last_name: 'Ryan'
    },
    {
        username: 'katniss',
        email: 'katniss@gmail.com',
        password: 'Katniss$Everdeen2023',
        first_name: 'Katniss',
        last_name: 'Everdeen'
    },
    {
        username: 'legolas',
        email: 'legolas@gmail.com',
        password: 'Legolas@Greenleaf2023',
        first_name: 'Legolas',
        last_name: 'Greenleaf'
    },
    {
        username: 'marypoppins',
        email: 'marypoppins@gmail.com',
        password: 'Mary#Poppins2023',
        first_name: 'Mary',
        last_name: 'Poppins'
    },
    {
        username: 'nancy',
        email: 'nancy@gmail.com',
        password: 'Nancy!Drew2023',
        first_name: 'Nancy',
        last_name: 'Drew'
    },
    {
        username: 'oliverqueen',
        email: 'oliverqueen@gmail.com',
        password: 'Oliver$Queen2023',
        first_name: 'Oliver',
        last_name: 'Queen'
    },
    {
        username: 'peterparker',
        email: 'peterparker@gmail.com',
        password: 'Peter@Parker2023',
        first_name: 'Peter',
        last_name: 'Parker'
    },
    {
        username: 'quentin',
        email: 'quentin@gmail.com',
        password: 'Quentin#Tarantino2023',
        first_name: 'Quentin',
        last_name: 'Tarantino'
    },
    {
        username: 'rebeccablack',
        email: 'rebeccablack@gmail.com',
        password: 'Rebecca!Black2023',
        first_name: 'Rebecca',
        last_name: 'Black'
    },
    {
        username: 'sherlock',
        email: 'sherlock@gmail.com',
        password: 'Sherlock$Holmes2023',
        first_name: 'Sherlock',
        last_name: 'Holmes'
    },
    {
        username: 'tonystark',
        email: 'tonystark@gmail.com',
        password: 'Tony@Stark2023',
        first_name: 'Tony',
        last_name: 'Stark'
    },
    {
        username: 'ursula',
        email: 'ursula@gmail.com',
        password: 'Ursula#SeaWitch2023',
        first_name: 'Ursula',
        last_name: 'SeaWitch'
    },
    {
        username: 'victorfrankenstein',
        email: 'victorfrankenstein@gmail.com',
        password: 'Victor!Frankenstein2023',
        first_name: 'Victor',
        last_name: 'Frankenstein'
    }
];

const insertCustomer = async (username, email, password, first_name, last_name) => {
    const {rows} = await pool.query('INSERT INTO customer (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5)', [username, email, password, first_name, last_name]);
    return rows;
};

customers.forEach(async (customer) => {
    const rows = await insertCustomer(customer.username, customer.email, customer.password, customer.first_name, customer.lastjson_name);
    console.log(rows);
});