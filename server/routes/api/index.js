const router = require("express").Router();

router.use("/auth", require("./user.route"))

router.use("/messages" ,require("./messages.route"))

module.exports = router;