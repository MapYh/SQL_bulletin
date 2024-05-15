const { Router } = require("express");
const { signup } = require("../controllers/account-controller");

const router = Router();

router.post("/signup", signup);
/* router.post("/login", login); */

module.exports = router;