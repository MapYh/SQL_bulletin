const {
  addNewChannel,
  deleteChannel,
  isChannelOwner,
  getChannelId,
} = require("../models/channel-model");

const { getUserId } = require("../models/subscription-model");

async function createChannel(req, res) {
  const { channel_name, channel_owner_id } = req.body;

  if (!channel_name || !channel_owner_id) {
    return res.status(400).json({
      error: "required fields channel_name and channel_owner_id missing",
    });
  }

  //check that the userId exist
  const userExists = await getUserId(channel_owner_id);
  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
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
  const { channel_id, user_id } = req.body;

  //check that channel_id exists in db
  const channelExists = await getChannelId(channel_id);
  if (!channelExists) {
    return res.status(404).json({ error: "Channel not found" });
  }

  //check that user_id exits in db -- WORKS
  const userExists = await getUserId(user_id);
  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }

  //check that the owner id created the channel
  const isOwner = await isChannelOwner(user_id, channel_id);
  if (!isOwner) {
    return res
      .status(403)
      .json({ error: " user is not authorized to delete this channel" });
  }

  try {
    //try to delete the channel
    const result = await deleteChannel(channel_id);
    res.status(201).json({
      message: "success! channel deleted",
      channelId: result.channelId,
    });
  } catch (error) {
    console.error("error deleting channel:", error);
    res.status(500).json({ error: "internal server error" });
  }
}

module.exports = { createChannel, removeChannel };
