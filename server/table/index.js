const express = require('express');
const router = express.Router();
const tableController = require('./table.controller');

router.get('/', tableController.getAllTables);
router.post('/', tableController.createTable);
router.delete('/:id', tableController.deleteTableById);

module.exports = router;
