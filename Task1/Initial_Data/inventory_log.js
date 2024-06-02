require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Ganti dengan username PostgreSQL Anda
  host: 'localhost',
  database: 'GoodReadingBookstore', // Ganti dengan nama database Anda
  password: process.env.password, // Ganti dengan password untuk database
  port: 5432, // Port default PostgreSQL
});

const gas = async () => {
    for (let i = 1; i <= 156; i++)
    {
        const { rows } = await pool.query('SELECT * FROM inventory WHERE inventory_id = $1', [i]);
        const store_id = rows[0].store_id;
        const quantity = rows[0].quantity;

        // find staff in store
        console.log(store_id)
        console.log()
        const { rows: staff } = await pool.query('SELECT * FROM staff WHERE store_id = $1', [store_id]);
        const randomStaff = staff[Math.floor(Math.random() * staff.length)];

        // insert LOG
        const { rows:hasil } = await pool.query('INSERT INTO inventory_log (inventory_id, updated_by, quantity) VALUES ($1, $2, $3)', [i, randomStaff.staff_id, quantity]);
        console.log(hasil[0].inventory_log_id);
    }
};

gas().then(() => {
    console.log('Function executed successfully');
}).catch((err) => {
    console.error('An error occurred:', err);
});
