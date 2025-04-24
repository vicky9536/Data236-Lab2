const express = require('express');
const router = express.Router();
const customerAuthCtrl = require('../controllers/customerAuthCtrl');

router.post('/customer/signup', customerAuthCtrl.customerSignup);
router.post('/customer/login', customerAuthCtrl.customerLogin);
router.post('/customer/logout', customerAuthCtrl.customerLogout);

module.exports = router;