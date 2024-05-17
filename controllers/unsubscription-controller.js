const { getUserId, getChannelId, checkSubscription } = require("../models/subscription-model");
const { unsubscribeUserFromChannel } = require("../models/unsubscription-model");

async function unsubscription(req, res) {
  const { user_id, channel_id } = req.body;

  if (!user_id || !channel_id) {
    return res.status(400).json({ error: "User ID and Channel ID are required" });
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

    const isSubscribed = await checkSubscription(user_id, channel_id);
    if (!isSubscribed) {
      return res.status(409).json({ error: "User is not subscribed to the channel" });
    }

    await unsubscribeUserFromChannel(user_id, channel_id);
    return res.status(200).json({ message: "User unsubscribed from the channel successfully" });
  } catch (error) {
    console.error("Error unsubscribing from channel", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { unsubscription };
