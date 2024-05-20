const {
  addNewChannel,
  deleteChannel,
  isChannelOwner,
} = require("../models/channel-model");
const database = require("../database/db");
const db = database.initDatabase();
const { getUserId } = require("../models/subscription-model");

async function createChannel(req, res) {
  const { channel_name, channel_owner_id } = req.body;

  if (!channel_name || !channel_owner_id) {
    return res.status(400).json({
      error: "required fields channel_name and channel_owner_id missing",
    });
  }

  //kontrollera användaren finns i databasen
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

  console.log("removeChannel function called");
  console.log("Request body:", req.body);

  if (!channel_id || !user_id) {
    return res.status(400).json({
      error: "required field channel_id or user_id is missing",
    });
  }

  // kollar om kanalen finns i db
  try {
    const channelExists = await new Promise((resolve, reject) => {
      db.get(
        `SELECT 1 FROM channels WHERE channel_id = ?`,
        [channel_id],
        function (err, row) {
          if (err) {
            reject(err);
          } else {
            resolve(!!row);
          }
        }
      );
    });

    if (!channelExists) {
      return res.status(404).json({ error: "channel not found" });
    }
  } catch (error) {
    console.error("error finding channel:", error);
    return res.status(500).json({ error: "internal server error" });
  }

  // kollar om användaren finns i db
  try {
    const userExists = await new Promise((resolve, reject) => {
      db.get(
        `SELECT 1 FROM users WHERE user_id = ?`,
        [user_id],
        function (err, row) {
          if (err) {
            reject(err);
          } else {
            resolve(!!row);
          }
        }
      );
    });

    if (!userExists) {
      return res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    console.error("error finding user:", error);
    return res.status(500).json({ error: "internal server error" });
  }

  // kollar om användaren är ägare av kanalen
  const isOwner = await isChannelOwner(user_id, channel_id);
  console.log(
    `Is user ${user_id} the owner of channel ${channel_id}?`,
    isOwner
  );
  if (!isOwner) {
    return res
      .status(403)
      .json({ error: "user is not authorized to delete this channel" });
  }

  // raderar kanalen
  try {
    const result = await deleteChannel(channel_id);
    res.status(200).json({ message: "success! removed channel", result });
  } catch (error) {
    console.error("error removing channel:", error);
    res.status(500).json({ error: "internal server error" });
  }
}

module.exports = { createChannel, removeChannel };
