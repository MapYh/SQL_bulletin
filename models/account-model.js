const database = require('../database/db')
const db = database.initDatabase();

async function createAccount (user_name, user_password) {
    return new Promise ((resolve, reject) => {
        db.serialize(() => { 
            db.run(`INSERT INTO users (user_name, user_password) VALUES (?, ?)`, [user_name, user_password], function(err) {
                if (err) {
                    console.error("Error creating account", err.message);
                    reject(err);
                } else {
                    const userId = this.lastID;
                    resolve(userId);
                }
            })
        } )
    })
}

module.exports = { createAccount };