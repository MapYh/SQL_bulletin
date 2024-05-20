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
          const isOwner = row && row.channel_owner_id === user_id;

          resolve(isOwner);
        }
      }
    );
  });
}

function deleteChannel(user_id, channel_id) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT channel_id FROM channels WHERE channel_id = ?`,
      [channel_id],
      function (err, row) {
        if (err) {
          console.error("error executing query:", err.message);
          reject(err);
        } else if (!row) {
          reject(new Error("couldn't find this channel"));
        } else {
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
};
