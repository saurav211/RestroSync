const express = require('express');
const router = express.Router();

router.use('/table', require('../table'));
router.use('/chef', require('../chef'));
router.use('/order', require('../order'));
router.use('/menu', require('../menu'));

module.exports = router;
