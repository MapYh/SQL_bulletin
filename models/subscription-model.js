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

async function getUserId(user_id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE user_id = ?", [user_id], (err, row) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
async function getChannelId(channel_id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM channels WHERE channel_id = ?", [channel_id], (err, row) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

async function checkSubscription(user_id, channel_id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM subscriptions WHERE user_id = ? AND channel_id = ?", [user_id, channel_id], (err, row) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = { subscribeUserToChannel, getUserId, getChannelId, checkSubscription };
