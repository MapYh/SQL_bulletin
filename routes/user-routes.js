const Router = require("express");
const { db } = require("../database/db.js");
const {
  signup,
  login,
  getAllUsers,
} = require("../controllers/account-controller.js");

const { getAUserById } = require("../controllers/subscription-controller.js");

const { auth } = require("../middleware/auth");
const router = Router();
router.use(Router.json());

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", auth, getAllUsers);
router.get("/userId", auth, getAUserById);

module.exports = router;
