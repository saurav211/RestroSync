const express = require('express');
const router = express.Router();

router.use('/table', require('../table'));

module.exports = router;
