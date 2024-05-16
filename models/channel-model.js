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

module.exports = { addNewChannel };
