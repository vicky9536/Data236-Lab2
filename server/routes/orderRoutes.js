const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderCtrl');

router.post('/create', orderCtrl.createOrder);
router.put('/update/:id', orderCtrl.updateOrderStatus);

module.exports = router;