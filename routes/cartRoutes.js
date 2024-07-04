const express = require('express');
const { createCart, getCarts, getCart, updateCart, deleteCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/', createCart);
router.get('/', getCarts);
router.get('/:id', getCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

module.exports = router;
