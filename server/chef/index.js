const express = require('express');
const router = express.Router();
const chefController = require('./chef.controller');

router.get('/', chefController.getAllChefs);
router.post('/', chefController.addChef);
router.patch('/:id/orders', chefController.updateChefOrders);

module.exports = router;
