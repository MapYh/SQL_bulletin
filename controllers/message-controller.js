const { insertMessage } = require("../models/message-model");
const { getChannelId, getUserId, checkSubscription } = require("../models/subscription-model");

async function postMessage (req, res) {
 const { user_id, channel_id, title, content} = req.body;

 if (!user_id || !channel_id || !title || !content || title.length > 50) {
  return res.status(400).json({ error: "User ID, Channel ID, title and content are required, and title must be less than 50 characters" });
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

    const isUserSubscribed = await checkSubscription(user_id, channel_id)

    if (!isUserSubscribed) {
        return res.status(403).json({error: "User must be subscribed to post a message on the channel"})
    }

    await insertMessage(user_id, channel_id, title, content);
    res.status(200).json({ message: "Message posted successfully", title, content });
  } catch (error) {
    console.error("Error posting message", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { postMessage };