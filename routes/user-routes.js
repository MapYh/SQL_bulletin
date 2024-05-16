const Router = require("express");
const { signup, login } = require("../controllers/account-controller");
const { auth } = require("../middleware/auth");
const { db } = require("../database/db.js");
const router = Router();
router.use(Router.json());
/* router.post("/signup", signup);
router.post("/login",  login); */

//GET all users by username.
router.get("/users", (req, res) => {
  db.all("SELECT user_name FROM users", function (error, rows) {
    if (error) {
      res.status(400).json({ succcess: false, Message: error });
    } else {
      res.status(200).json({ succcess: true, Users: rows });
    }
  });
});

module.exports = router;
