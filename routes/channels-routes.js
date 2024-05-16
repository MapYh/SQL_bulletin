const Router = require("express");
const { db } = require("../database/db.js");
const router = Router();
router.use(Router.json());

/*-------GET----------- */

//GET all channels by channel name.
router.get("/channels", (req, res) => {
  db.all("SELECT channel_name FROM channels", function (error, rows) {
    if (error) {
      res.status(400).json({ succcess: false, Message: error });
    } else {
      res.status(200).json({ succcess: true, Channels: rows });
    }
  });
});

module.exports = router;
