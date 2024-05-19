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
    db.all(
      `SELECT channels.channel_name, messages.title, messages.content, users.user_name 
                FROM messages
                JOIN users ON messages.user_id = users.user_id
                JOIN channels ON messages.channel_id = channels.channel_id
                WHERE messages.channel_id = ?`,
      [channel_id],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

async function isMessageAuthor(message_id, user_id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT user_id FROM messages WHERE message_id = ?", [message_id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        const isAuthor = row && row.user_id === user_id;
        resolve(isAuthor);
      }
    });
  });
}

async function editMessageById(message_id, title, content) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE messages SET `;
    const params = [];

    if (title && content) {
      sql += `title = ?, content = ?`;
      params.push(title, content);
    } else if (title) {
      sql += `title = ?`;
      params.push(title);
    } else if (content) {
      sql += `content = ?`;
      params.push(content);
    } else {
      resolve({ changes: false });
      return;
    }

    sql += ` WHERE message_id = ?`;
    params.push(message_id);

    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        if (this.changes > 0) {
          resolve({ changes: true });
        } else {
          resolve({ changes: false });
        }
      }
    });
  });
}

module.exports = { insertMessage, getMessagesByChannel, editMessageById, isMessageAuthor };
