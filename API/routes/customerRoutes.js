const express = require('express');
const router = express.Router();
const customerControllers = require('../controllers/customerControllers');
const validEmailPassword = require('../middlewares/validEmailPassword');


// data customer
router.get('/', customerControllers.customerList);
router.get('/:customerId', customerControllers.oneCustomer);
router.post('/login', validEmailPassword, customerControllers.login);
router.post('/register', validEmailPassword ,customerControllers.register);
router.patch('/:customerId', validEmailPassword, customerControllers.patchCustomer);

// wishlist
router.delete('/wishlist/:wishlistId', customerControllers.deleteWishlist);
router.post('/wishlist', customerControllers.addWishlist);

// address
router.delete('/address/:customerLocationId', customerControllers.deleteCustomerAddress);
router.post('/address/:customerId', customerControllers.addAddress);

module.exports = router;