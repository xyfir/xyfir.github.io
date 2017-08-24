const router = require('express').Router();

router.get('/ads', require('./ads'));
router.post('/contact', require('./contact'));
router.post('/advertise', require('./advertise'));

module.exports = router;