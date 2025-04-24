const express = require('express');
const router = express.Router();
const resDbCtrl = require('../controllers/resDashboardCtrl');

router.get('/restaurants', resDbCtrl.getAllRest);
router.get('/restaurants/:id/dishes', resDbCtrl.getDishes);

module.exports = router;