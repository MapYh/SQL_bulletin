const database = require("../database/db");
const db = database.initDatabase();

function addNewChannel(channel_name, channel_owner_id) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO channels (channel_name, channel_owner_id) VALUES (?, ?)`,
      [channel_name, channel_owner_id],
      function (err) {
        if (err) {
          console.error("couldn't add new channel:", err.message);
          reject(err);
        } else {
          resolve({ channelId: this.lastID });
        }
      }
    );
  });
}

function getChannels() {
  return new Promise((resolve, reject) => {
    db.all("SELECT channel_name FROM channels", function (error, rows) {
      if (error) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getChannelIdByMessageId(message_id) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT channel_id FROM messages WHERE message_id = ?`,
      [message_id],
      (err, row) => {
        if (err) {
          console.error("Error executing query:", err);
          reject(err);
        } else {
          resolve(row ? row.channel_id : null);
        }
      }
    );
  });
}

function isChannelOwner(user_id, channel_id) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT channel_owner_id FROM channels WHERE channel_id = ?`,
      [channel_id],
      (err, row) => {
        if (err) {
          console.error("Error executing query:", err);
          reject(err);
        } else {
          console.log(`${channel_id}, found owner:`, row);
          const channelOwnerId = row ? String(row.channel_owner_id) : null;
          const userId = String(user_id);
          const isOwner = channelOwnerId === userId;
          console.log(`Expected owner ID: ${userId}`);
          console.log(`Actual owner ID: ${channelOwnerId}`);
          resolve(isOwner);
        }
      }
    );
  });
}

function deleteChannel(channel_id) {
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM channels WHERE channel_id = ?`,
      [channel_id],
      function (err) {
        if (err) {
          console.error("couldn't delete channel", err.message);
          reject(err);
        } else {
          resolve({ message: "channel deleted successfully" });
        }
      }
    );
  });
}

module.exports = {
  addNewChannel,
  isChannelOwner,
  getChannelIdByMessageId,
  deleteChannel,
  getChannels,
};
