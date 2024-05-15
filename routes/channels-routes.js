const { Router } = require("express");

const router = Router();

router.post("/", createChannel);

module.exports = router;