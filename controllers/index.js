const router = require('express').Router();

router.post('/contact', require('./contact'));
router.post('/advertise', require('./advertise'));

module.exports = router;