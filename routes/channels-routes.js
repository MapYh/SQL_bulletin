const { Router } = require("express");
const { subscription } = require("../controllers/subscription-controller");
const { auth } = require("../middleware/auth");
const { createChannel } = require("../controllers/channel-controller.js");
const {
  unsubscription,
} = require("../controllers/unsubscription-controller.js");
const {
  postMessage,
  getMessages,
  updateMessage,
} = require("../controllers/message-controller.js");
const router = Router();
/* router.use(Router.json()); */

/*-------GET----------- */

//GET all channels by channel name.
router.get("/", (req, res) => {
  db.all("SELECT channel_name FROM channels", function (error, rows) {
    if (error) {
      res.status(400).json({ succcess: false, Message: error });
    } else {
      res.status(200).json({ succcess: true, Channels: rows });
    }
  });
});

router.post("/subscribe", auth, subscription);
router.post("/unsubscribe", auth, unsubscription);
router.post("/post", auth, postMessage);
router.get("/:id/posts", auth, getMessages);
router.put("/post/:id", auth, updateMessage);

module.exports = router;
