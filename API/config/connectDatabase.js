const { Pool } = require("pg");
const moment = require("moment-timezone");

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        Database.instance = this;

        try {
            this.pool = new Pool({
                user: "postgres",
                host: "localhost",
                database: "GoodReadingBookstore",
                password: process.env.password,
                port: 5432,
            });
        } catch (error) {
            console.error("Error connecting to the database: ", error);
        }

        return this;
    }

    async isConnected() {
        try {
            const DateConnected = await this.pool.query("SELECT NOW()");
            const DateConnectedJKT = moment.tz(DateConnected.rows[0].now, "Asia/Jakarta");
            console.log(`Connected to the database at ${DateConnectedJKT}`);
            return true;
        } catch (error) {
            console.error("Error connecting to the database: ", error);
            return false;
        }
    }

    getPool() {
        return this.pool;
    }
}

module.exports = new Database();
