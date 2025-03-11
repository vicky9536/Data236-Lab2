const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cartCtrl');

router.get('/getCart/:customer_Id', cartCtrl.getCart);
router.post('/addCart/:customer_Id', cartCtrl.addCart);
router.delete('/deleteCart/:customer_Id/:dish_Id', cartCtrl.deleteCart);
router.post('/checkout/:customer_Id', cartCtrl.checkout);

module.exports = router;