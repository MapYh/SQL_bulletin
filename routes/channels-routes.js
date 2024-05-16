const Router = require("express");
const { db } = require("../database/db.js");
const router = Router();
router.use(Router.json());

const { createChannel } = require("../controllers/channel-controller.js");

/*-------GET----------- */

//GET all channels by channel name.
router.get("/", (req, res) => {
  db.all("SELECT channel_name FROM channels", function (error, rows) {
    if (error) {
      console.error(error);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.post("/", createChannel);

module.exports = router;
