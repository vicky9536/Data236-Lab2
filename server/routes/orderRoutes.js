const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderCtrl');

router.get('/viewOrder/:restaurant_Id', orderCtrl.viewOrder);
router.post('/create/:customer_Id', orderCtrl.createOrder);
router.put('/update/:restaurant_Id/:order_Id', orderCtrl.updateOrderStatus);

module.exports = router;