const express = require('express');
const router = express.Router();
const dishCtrl = require('../controllers/dishCtrl');

router.get('/get/:restaurant_Id/:dish_Id', dishCtrl.getOneDish);
router.post('/create/:restaurant_Id', dishCtrl.createDish);
router.post('/update/:restaurant_Id/:dish_Id', dishCtrl.updateDish);
router.delete('/delete/:restaurant_Id/:dish_Id', dishCtrl.deleteDish);

module.exports = router;
