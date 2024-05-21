const { Router } = require("express");
const database = require("../database/db");
const db = database.initDatabase();
const { subscription } = require("../controllers/subscription-controller");
const { auth } = require("../middleware/auth");
const {
  createChannel,
  removeChannel,
  getAllChannels,
} = require("../controllers/channel-controller.js");
const {
  unsubscription,
} = require("../controllers/unsubscription-controller.js");
const {
  postMessage,
  getMessages,
  updateMessage,
  removeMessage,
} = require("../controllers/message-controller.js");
const router = Router();
/* router.use(Router.json()); */

/*-------GET----------- */

//GET all channels.
router.get("/", auth, getAllChannels);

//POST a new channel
router.post("/", createChannel);

//DELETE a channel
router.delete("/", removeChannel);

router.post("/subscribe", auth, subscription);
router.post("/unsubscribe", auth, unsubscription);
router.post("/post", auth, postMessage);
router.get("/:id/posts", auth, getMessages);
router.put("/post/:id", auth, updateMessage);
router.delete("/post/:id", auth, removeMessage);

module.exports = router;
