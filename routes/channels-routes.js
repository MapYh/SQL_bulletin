const { Router } = require("express");
const { subscription } = require("../controllers/subscription-controller");
const { auth } = require("../middleware/auth");

const router = Router();

router.post("/subscribe", auth,  subscription);

module.exports = router;