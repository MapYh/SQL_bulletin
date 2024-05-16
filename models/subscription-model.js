const database = require("../database/db");
const db = database.initDatabase();

async function subscribeUserToChannel(user_id, channel_id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM subscriptions WHERE user_id = ? AND channel_id = ?`, [user_id, channel_id], (err, row) => {
      if (err) {
        console.error("Error checking subscription:", err);
        reject(err);
      } else if (row) {
        resolve({ message: "User is already subscribed to the channel" });
      } else {
        db.run(`INSERT INTO subscriptions (user_id, channel_id) VALUES (?, ?)`, [user_id, channel_id], function (err) {
          if (err) {
            console.error("Error subscribing to channel:", err);
            reject(err);
          } else {
            resolve({ subscriptionId: this.lastID, message: "User subscribed to channel successfully" });
          }
        });
      }
    });
  });
}

module.exports = { subscribeUserToChannel };
