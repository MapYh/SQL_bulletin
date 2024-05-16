const Router = require("express");
const { db } = require("../database/db.js");
const { signup, login } = require("../controllers/account-controller.js");
const router = Router();
router.use(Router.json());

router.post("/signup", signup);
router.post("/login", login); 

//GET all users by username.
router.get("/users", (req, res) => {
  db.all("SELECT user_name FROM users", function (error, rows) {
    if (error) {
      console.error(error);
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;
