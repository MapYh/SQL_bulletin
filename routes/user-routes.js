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
      res.status(400).json({ succcess: false, Message: error });
    } else {
      res.status(200).json({ succcess: true, Users: rows });
    }
  });
});

//GET all users with a specifick userID, returns an array of objects with usernames.
router.get("/userID", (req, res) => {
  const { user_id } = req.body;
  db.all("SELECT user_name FROM users", function (error, rows) {
    if (error) {
      res.status(400).json({ succcess: false, Message: error });
    } else {
      res.status(200).json({ succcess: true, User: rows });
    }
  });
});

module.exports = router;
