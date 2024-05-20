const { addNewChannel, deleteChannel } = require("../models/channel-model");

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

async function removeChannel(req, res) {
  const { channel_id } = req.body;

  if (!channel_id) {
    return res.status(400).json({
      error: "required field channel_id is missing",
    });
  }

  try {
    const result = await deleteChannel(channel_id);
    res.status(200).json({ message: "success! removed channel", result });
  } catch (error) {
    console.error("error removing channel:", error);
    if (error.message === "couldn't find this channel") {
      res.status(404).json({ error: "channel not found" });
    } else {
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = { createChannel, removeChannel };
