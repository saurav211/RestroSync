const express = require('express');
const router = express.Router();
const menuItemController = require('./menuItem.controller');

router.get('/', menuItemController.getAllMenuItems);
router.get('/category/:category', menuItemController.getMenuItemsByCategory);
router.post('/', menuItemController.createMenuItem);
router.post('/bulk', menuItemController.createManyMenuItems);

module.exports = router;
