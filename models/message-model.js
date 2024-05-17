const database = require("../database/db");
const db = database.initDatabase();

async function insertMessage(user_id, channel_id, title, content) {
return new Promise ((resolve, reject) => {
    db.run(`INSERT INTO messages (user_id, channel_id, title, content) VALUES (?, ?, ?, ?)` , [user_id, channel_id, title, content], function(err) {
        if (err) {
            reject(err);
        }else {
            resolve(this.lastID)
        }
    } )
})
} 

module.exports = { insertMessage };