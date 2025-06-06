const express = require('express');
const router  = express.Router();
const {
    getCart,
    updateCart,
    createCart,
    deleteItemFromCart
}             = require('../controllers/cartControllers');

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

//Get a cart by user_id:
router.get('/',getCart);

router.post('/',createCart);

router.patch('/',updateCart);

router.delete('/:id',deleteItemFromCart)

module.exports = router;