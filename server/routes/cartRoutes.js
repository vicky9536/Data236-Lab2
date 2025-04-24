const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cartCtrl');

router.get('/getCart/:customerId', cartCtrl.getCart);
router.post('/addCart', cartCtrl.addCart);
router.delete('/deleteCart/:id', cartCtrl.deleteCart);
router.post('/checkout', cartCtrl.checkout);

module.exports = router;