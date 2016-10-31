const express = require('express');
const router = express.Router();

router.use('/clients', require('./users'))

module.exports = router;
