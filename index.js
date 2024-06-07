const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const handler404 = require('./API/middlewares/handler404');
const PORT = process.env.PORT || 3500;
const Database = require('./API/config/connectDatabase');
const db = Database;
const startServer = require('./API/config/startServer');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/customer', require('./API/routes/customerRoutes'));
app.use('/staff', require('./API/routes/staffRoutes'));
app.use('/book', require('./API/routes/bookRoutes'));
app.use('/store', require('./API/routes/storeRoutes'));
app.all('*', handler404);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

(async () => {
    if (await db.isConnected()) {
        startServer(app, PORT);
    }
})();