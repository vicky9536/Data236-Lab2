const express = require('express');
const router = express.Router();
const cusProfileCtrl = require('../controllers/cusProfileCtrl');

router.get('/viewCus/me', cusProfileCtrl.viewCusProfile);
router.put('/updateCus/me', cusProfileCtrl.updateCusProfile);

module.exports = router;