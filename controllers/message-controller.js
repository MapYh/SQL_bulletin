const { isChannelOwner, getChannelIdByMessageId } = require("../models/channel-model");
const {
  insertMessage,
  getMessagesByChannel,
  editMessageById,
  isMessageAuthor,
  deleteMessageById,
} = require("../models/message-model");
const { getChannelId, getUserId, checkSubscription } = require("../models/subscription-model");

async function postMessage(req, res) {
  const { user_id, channel_id, title, content } = req.body;

  if (!user_id || !channel_id || !title || !content || title.length > 50) {
    return res.status(400).json({
      error: "User ID, Channel ID, title and content are required, and title must be less than 50 characters",
    });
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

    const isUserSubscribed = await checkSubscription(user_id, channel_id);

    if (!isUserSubscribed) {
      return res.status(403).json({ error: "User must be subscribed to post a message on the channel" });
    }

    await insertMessage(user_id, channel_id, title, content);
    res.status(200).json({ message: "Message posted successfully", title, content });
  } catch (error) {
    console.error("Error posting message", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getMessages(req, res) {
  try {
    const channel_id = req.params.id;
    const user_id = req.user.id;
    const isUserSubscribed = await checkSubscription(user_id, channel_id);

    if (!isUserSubscribed) {
      return res.status(403).json({ error: "User must be subscribed to channel to see this content" });
    }
    const messages = await getMessagesByChannel(channel_id);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving messages", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateMessage(req, res) {
  const message_id = req.params.id;
  const { title, content } = req.body;
  const user_id = req.user.id;

  if (!title && !content) {
    return res.status(400).json({ error: "Title or content are required" });
  }

  if (title.length > 50) {
    return res.status(400).json({ error: "Title must be less than 50 characters" });
  }

  try {
    const isAuthor = await isMessageAuthor(message_id, user_id);
    if (!isAuthor) {
      return res.status(403).json({ error: "You are not authorized to update this message" });
    }

    const result = await editMessageById(message_id, title, content);

    if (!result.changes) {
      return res.status(404).json({ error: "Message not found or no changes made" });
    }

    res.status(200).json({
      message: "Message updated successfully",
      updatedMessage: { message_id, title, content },
    });
  } catch (error) {
    console.error("Error updating message", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function removeMessage(req, res) {
  const message_id = req.params.id;
  const user_id = req.user.id;

  try {
    const channel_id = await getChannelIdByMessageId(message_id);
    if (!channel_id) {
      return res.status(404).json({ error: "Message not found" });
    }

    const isAuthor = await isMessageAuthor(message_id, user_id);
    const isOwner = await isChannelOwner(user_id, channel_id);
    if (!isAuthor && !isOwner) {
      return res.status(403).json({ error: "User is not authorized to delete this message" });
    }

    await deleteMessageById(message_id);
    res.status(200).json({ message: `Message with id ${message_id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting message", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { postMessage, getMessages, updateMessage, removeMessage };
