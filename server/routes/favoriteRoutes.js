const express = require('express');
const router = express.Router();
const favoriteCtrl = require('../controllers/favoriteCtrl');

router.post('/addFavorite/:customer_Id', favoriteCtrl.addFavorite);
router.get('/getFavorites/:customer_Id', favoriteCtrl.getFavorites);
router.delete('/removeFavorite/:customer_Id/:id', favoriteCtrl.removeFavorite);

module.exports = router;