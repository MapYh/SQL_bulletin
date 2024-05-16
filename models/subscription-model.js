const database = require("../database/db");
const db = database.initDatabase();

async function subscribeUserToChannel(user_id, channel_id) {
    return new Promise ((resolve, reject)=> {
        db.run(`INSERT INTO subscriptions (user_id, channel_id)`)
    })
}