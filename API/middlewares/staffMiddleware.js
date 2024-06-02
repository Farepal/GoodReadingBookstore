const Database = require('../config/connectDatabase');
const pool = Database.getPool();

const staffMiddleware = async (req, res, next) => {
    try {
        if (req.cookies.staffEmail) {
            const staff = await getStaffByEmail(req.cookies.staffEmail);
            if (staff) {
                req.staff = staff;
            } else {
                return res.status(401).json({ message: 'User not found' });
            }
        } else {
            return res.status(401).json({ message: 'Sign In terlebih dahulu hanya dengan Email' });
        }
        next();
    } catch (error) {
        next(error);
    }

    async function getStaffByEmail(email) {
        const queryText = 'SELECT * FROM staff WHERE email = $1';
        const { rows } = await pool.query(queryText, [email]);
        return rows[0];
    }
}

module.exports = staffMiddleware;