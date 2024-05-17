const database = require("../database/db");
const db = database.initDatabase();

async function unsubscribeUserFromChannel(user_id, channel_id) {
    return new Promise ((resolve, reject) => {
        db.run (`DELETE FROM subscriptions WHERE user_id = ? AND channel_id = ?`, [user_id, channel_id], function (err) {
           if (err) {
            console.error(err);
            reject(err);
           } else {
            resolve();
           }
        } )
    })
}

module.exports = { unsubscribeUserFromChannel}