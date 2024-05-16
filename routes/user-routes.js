const { Router } = require("express");
const { signup, login } = require("../controllers/account-controller");
const { auth } = require("../middleware/auth");

const router = Router();

router.post("/signup", signup);
router.post("/login",  login);

module.exports = router;