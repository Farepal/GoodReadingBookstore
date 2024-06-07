const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookControllers');

router.get('/', bookControllers.allBooks);
router.get('/:bookId', bookControllers.oneBook);
router.post('/', bookControllers.addBook);

module.exports = router;