const Database = require("../config/connectDatabase");
const pool = Database.getPool();

const signUp = async (req, res, next) => {
    try {
        const { storeName, email, password } = req.body;
        if (!storeName || !email || !password)
            return res.status(400).json({ message: 'All fields are required' });

        if (await isEmailExistInStaffDb(email))
            return res.status(400).json({ message: 'Email already exists' });

        const storeId = await getStoreId(storeName);

        if (!storeId)
            return res.status(400).json({ message: 'Store not found' });

        await insertStaff(storeId, email, password);
        res.status(201).json({ message: 'Staff created successfully' });

    } catch (error) {
        next(error);
    };

    async function isEmailExistInStaffDb(email) {
        const queryText = 'SELECT * FROM staff WHERE email = $1';
        const { rows } = await pool.query(queryText, [email]);
        return rows.length > 0;
    }

    async function getStoreId(storeName) {
        const queryText = 'SELECT store_id FROM store WHERE store_name = $1';
        const { rows } = await pool.query(queryText, [storeName]);

        if (rows.length === 0)
            return null;
        return rows[0].store_id;
    }

    async function insertStaff(storeId, email, password) {
        try {
            const queryText = 'INSERT INTO staff (store_id, email, password) VALUES ($1, $2, $3)';
            await pool.query(queryText, [storeId, email, password]);
            await pool.query('COMMIT');
        } catch (error) {
            await pool.query('ROLLBACK');
            throw error;
        }
    }
}

const signInEmailOnly = async (req, res, next) => {
    try {
        const { email } = req.body;

        const staff = await getStaffByEmail(email);
        if (!staff)
            return res.status(400).json({ message: 'Email not found' });

        if (req.cookies.staffEmail)
            res.clearCookie('staffEmail');
        res.cookie('staffEmail', email, { httpOnly: true });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        next(error);
    }

    async function getStaffByEmail(email) {
        const queryText = 'SELECT * FROM staff WHERE email = $1';
        const { rows } = await pool.query(queryText, [email]);
        return rows[0];
    }
}

const signOut = (req, res, next) => {
    if (req.cookies.staffEmail)
        res.clearCookie('staffEmail');
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = { signUp, signInEmailOnly, signOut };