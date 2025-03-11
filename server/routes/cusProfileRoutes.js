const express = require('express');
const router = express.Router();
const cusProfileCtrl = require('../controllers/cusProfileCtrl');

router.get('/viewCus/:id', cusProfileCtrl.viewCusProfile);
router.put('/updateCus/:id', cusProfileCtrl.updateCusProfile);

module.exports = router;