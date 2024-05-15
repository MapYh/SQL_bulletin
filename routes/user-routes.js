const { Router } = require("express");

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;