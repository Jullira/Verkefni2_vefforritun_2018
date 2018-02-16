const express = require('express');
const form = require('./form');
const router = express.Router();

router.use(form);

module.exports = router;
