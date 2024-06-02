const Database = require('./API/config/connectDatabase');
const pool = Database.getPool();

const signUp = async (req, res, next) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;

        if (!username || !email || !password || !firstName || !lastName)
            return res.status(400).json({ message: 'All fields are required' });

        if (await isEmailExistInCustomerDb(email))
            return res.status(400).json({ message: 'Email already exists' });

        await insertCustomer(username, email, password, firstName, lastName);
        res.status(201).json({ message: 'Customer created successfully' });
    } catch (error) {
        next(error);
    }

    async function isEmailExistInCustomerDb(email) {
        const queryText = 'SELECT * FROM customer WHERE email = $1';
        const { rows } = await pool.query(queryText, [email]);
        return rows.length > 0;
    }

    async function insertCustomer(username, email, password, firstName, lastName) {
        try {
            const queryText = 'INSERT INTO customer (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5)';
            await pool.query(queryText, [username, email, password, firstName, lastName]);
            await pool.query('COMMIT');
        } catch (error) {
            await pool.query('ROLLBACK');
            throw error;
        }
    }
};

const signInEmailOnly = async (req, res, next) => {
    try {
        const { email } = req.body;

        const customer = await getCustomerByEmail(email);
        if (!customer)
            return res.status(400).json({ message: 'Email not found' });

        if (req.cookies.customerEmail)
            res.clearCookie('customerEmail');
        res.cookie('customerEmail', email, { httpOnly: true });

        res.status(200).json({ message: 'Sign in success' });
    } catch (error) {
        next(error);
    }

    async function getCustomerByEmail(email) {
        const queryText = 'SELECT * FROM customer WHERE email = $1';
        const { rows } = await pool.query(queryText, [email]);
        return rows[0];
    }
}

const signOut = (req, res) => {
    if (req.cookies.customerEmail)
        res.clearCookie('customerEmail');
    res.status(200).json({ message: 'Sign out success' });
};

module.exports = { signUp, signIn, signOut };