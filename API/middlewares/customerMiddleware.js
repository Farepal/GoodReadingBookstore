const Database = require('../config/connectDatabase');
const pool = Database.getPool();

const customerMiddleware = async (req, res, next) => {
    try {
        if (req.cookies.customerEmail) {
            const customer = await getCustomerByEmail(req.cookies.customerEmail);
            if (customer) {
                req.customer = customer;
            } else {
                return res.status(401).json({ message: 'User not found' });
            }
        } 
        else {
            return res.status(401).json({ message: 'Sign In terlebih dahulu hanya dengan Email' });
        }
        next();
    } catch (error) {
        next(error);
    }

    async function getCustomerByEmail(email) {
        const queryText = 'SELECT * FROM customer WHERE email = $1';
        const { rows } = await pool.query(queryText, [email]);
        return rows[0];
    }
}

module.exports = customerMiddleware;