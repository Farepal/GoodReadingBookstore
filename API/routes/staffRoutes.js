const staffControllers = require('../controllers/staffControllers');
const express = require('express');
const router = express.Router();
const validEmail = require('../middlewares/validEmail');
const validEmailPassword = require('../middlewares/validEmailPassword');

router.post('/signup', validEmailPassword, staffControllers.signUp);
router.post('/signin', validEmail ,staffControllers.signInEmailOnly);
router.get('/signout', staffControllers.signOut);

module.exports = router;