const { Router } = require("express");
const { subscription } = require("../controllers/subscription-controller");
const { auth } = require("../middleware/auth");
const {
  createChannel,
  getAllChannels,
} = require("../controllers/channel-controller.js");
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

router.get("/", auth, getAllChannels);
router.post("/subscribe", auth, subscription);
router.post("/unsubscribe", auth, unsubscription);
router.post("/post", auth, postMessage);
router.get("/:id/posts", auth, getMessages);
router.put("/post/:id", auth, updateMessage);

module.exports = router;
