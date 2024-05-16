const { subscribeUserToChannel } = require("../models/subscription-model");

async function subscription (req, res)  {
    const { user_id, channel_id} = req.body;

    if (!user_id || !channel_id) {
        return res.status(400).json({ error: "User ID and Channel ID are required" });
    }

    try {
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

module.exports = { subscription };