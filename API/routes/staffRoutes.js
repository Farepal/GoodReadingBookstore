const staffControllers = require('../controllers/staffControllers');
const express = require('express');
const router = express.Router();
const validEmailPassword = require('../middlewares/validEmailPassword');

router.get('/', staffControllers.allStaffDetails);
router.get('/:staffId', staffControllers.staffDetails);
router.post('/register', validEmailPassword, staffControllers.register);
router.post('/login', validEmailPassword ,staffControllers.login);
router.patch('/:staffId', validEmailPassword ,staffControllers.changeStaffInformation);

module.exports = router;