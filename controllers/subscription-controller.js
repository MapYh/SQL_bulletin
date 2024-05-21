const {
  subscribeUserToChannel,
  getUserId,
  getChannelId,
  checkSubscription,
} = require("../models/subscription-model");

async function subscription(req, res) {
  const { user_id, channel_id } = req.body;

  if (!user_id || !channel_id) {
    return res
      .status(400)
      .json({ error: "User ID and Channel ID are required" });
  }

  try {
    const userExists = await getUserId(user_id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const channelExists = await getChannelId(channel_id);
    if (!channelExists) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const alreadySubscribed = await checkSubscription(user_id, channel_id);
    if (alreadySubscribed) {
      return res
        .status(409)
        .json({ error: "User already subscribed to the channel" });
    }
    await subscribeUserToChannel(user_id, channel_id);
    res.status(200).json({
      status: "success",
      message: "Subscribed to channel successfully",
    });
  } catch (error) {
    console.error("Error subscribing to channel", error);
    res.status(500).json({ message: "Error subscribing to channel" });
  }
}

async function getAUserById(req, res) {
  const { user_id } = req.body;
  try {
    const user = await getUserId(user_id);
    console.log(user);
    if (!user) {
      res.status(400).json({
        message: "Could not find user.",
      });
    } else {
      res.status(200).json({
        message: "Success",
        User: user,
      });
    }
  } catch (error) {
    console.error("Error could not find user", error);
    res.status(500).send("Internal server error");
  }
}

module.exports = { subscription, getAUserById };
