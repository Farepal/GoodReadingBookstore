const express = require('express');
const router = express.Router();
const customerControllers = require('../controllers/customerControllers');
const validEmail = require('../middlewares/validEmail');
const validEmailPassword = require('../middlewares/validEmailPassword');

router.post('/signup', validEmailPassword ,customerControllers.signUp);
router.post('/signin', validEmail, customerControllers.signInEmailOnly);
router.get('/signout', customerControllers.signOut);

module.exports = router;