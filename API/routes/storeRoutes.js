const express = require('express');
const router = express.Router();

const storeControllers = require('../controllers/storeControllers');

// all category
router.get('/category', storeControllers.allCategory);

// book query
router.get('/:storeId/book/author', storeControllers.bookByAuthor);
router.get('/:storeId/book/category', storeControllers.bookByCategory);
router.get('/:storeId/book/name', storeControllers.bookByName);

// inventory
router.post('/:storeId/inventory', storeControllers.addInventory);
router.post('/:storeId/inventory/:inventoryId', storeControllers.updateQuantity);

// store
router.get('/', storeControllers.allStoreDetails);
router.get('/:storeId', storeControllers.oneStore);


module.exports = router;