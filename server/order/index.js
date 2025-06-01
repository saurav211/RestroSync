const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');

router.post('/', orderController.placeOrder);
router.patch('/:id/complete', orderController.completeOrder);
router.get('/', orderController.getAllOrders);

module.exports = router;
