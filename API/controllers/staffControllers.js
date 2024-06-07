const Database = require("../config/connectDatabase");
const pool = Database.getPool();

const allStaffDetails = async (req, res, next) => {
    try {
        const staffs = await getAllStaff();
        res.status(200).json(staffs);
    } catch (error) {
        next(error);
    }

    async function getAllStaff() {
        const queryText = 'SELECT * FROM view_staff_details';
        const { rows } = await pool.query(queryText);
        return rows;
    }
}

const staffDetails = async (req, res, next) => {
    try {
        const { staffId } = req.params;
        if (!staffId)
            return res.status(400).json({ message: 'Staff ID is required' });

        const staff = await getStaffById(staffId);
        res.status(200).json(staff);

    } catch (error) {
        next(error);
    }

    async function getStaffById(staffId) {
        const queryText = 'SELECT * FROM view_staff_details WHERE staff_id = $1';
        const { rows } = await pool.query(queryText, [staffId]);
        return rows[0];
    }
}
const register = async (req, res, next) => {
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

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'All fields are required' });

        const staff = await getStaffByEmail(email);
        if (!staff)
            return res.status(400).json({ message: 'Email not found' });

        if (staff.password !== password)
            return res.status(400).json({ message: 'Incorrect password' });

        res.status(200).json({ message: 'Login success' });
    } catch (error) {
        next(error);
    }

    async function getStaffByEmail(email) {
        const queryText = 'SELECT * FROM staff WHERE email = $1';
        const { rows } = await pool.query(queryText, [email]);
        return rows[0];
    }
}

const changeStaffInformation = async (req, res, next) => {
    try {
        const { staffId } = req.params;
        const { email, password, storeId } = req.body;

        if (!staffId)
            return res.status(400).json({ message: 'Staff ID is required' });

        const staff = await getStaffById(staffId);

        if (email)
            staff.email = email;

        if (password)
            staff.password = password;

        if (storeId)
            staff.storeId = storeId;

        await updateStaff(staff);

        res.status(200).json({ message: 'Staff information updated' });
    } catch (error) {
        next(error);
    }

    async function getStaffById(staffId) {
        const queryText = 'SELECT * FROM staff WHERE staff_id = $1';
        const { rows } = await pool.query(queryText, [staffId]);
        return rows[0];
    }

    async function updateStaff(staff) {
        try {
            const queryText = 'UPDATE staff SET email = $1, password = $2, store_id = $3 WHERE staff_id = $4';
            await pool.query(queryText, [staff.email, staff.password, staff.storeId, staff.staffId]);
            await pool.query('COMMIT');
        } catch (error) {
            await pool.query('ROLLBACK');
            throw error;
        }
    }
}

module.exports = { register, login, staffDetails, changeStaffInformation, allStaffDetails };