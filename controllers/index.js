const router = require("express").Router();

router.post("/contact", require("./contact"));

module.exports = router;