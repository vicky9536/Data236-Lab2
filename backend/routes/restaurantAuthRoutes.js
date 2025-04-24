const express = require('express');
const router = express.Router();
const restaurantAuthCtrl = require('../controllers/restaurantAuthCtrl');

router.post('/restaurant/signup', restaurantAuthCtrl.restaurantSignup);
router.post('/restaurant/login', restaurantAuthCtrl.restaurantLogin);
router.post('/restaurant/logout', restaurantAuthCtrl.restaurantLogout);

module.exports = router;