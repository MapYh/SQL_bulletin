const { addNewChannel } = require("../models/channel-model");

async function createChannel(req, res) {
  const { channel_name, channel_owner_id } = req.body;

  if (!channel_name || !channel_owner_id) {
    return res.status(400).json({
      error: "required fields channel_name and channel_owner_id missing",
    });
  }

  try {
    const result = await addNewChannel(channel_name, channel_owner_id);
    res
      .status(201)
      .json({ message: "success! added channel", channelId: result.channelId });
  } catch (error) {
    console.error("error adding channel:", error);
    res.status(500).json({ error: "internal server error" });
  }
}

module.exports = { createChannel };