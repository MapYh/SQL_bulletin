const database = require("../database/db");
const db = database.initDatabase();

async function insertMessage(user_id, channel_id, title, content) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO messages (user_id, channel_id, title, content) VALUES (?, ?, ?, ?)`,
      [user_id, channel_id, title, content],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

async function getMessagesByChannel(channel_id) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT channels.channel_name, messages.title, messages.content, users.user_name 
                FROM messages
                JOIN users ON messages.user_id = users.user_id
                JOIN channels ON messages.channel_id = channels.channel_id
                WHERE messages.channel_id = ?`, [channel_id], (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows);
                    }
                });
  });
}

module.exports = { insertMessage, getMessagesByChannel };
