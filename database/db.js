const sqlite = require("sqlite3").verbose();

function initDatabase() {
  const db = new sqlite.Database("./database/database.db", (error) => {
    if (error) return console.log(error);
    console.log("Connected to database");
  });

  let sql_user = `CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY, 
    user_name VARCHAR(255),
    user_password TEXT
  )`;

  let sql_channel = `CREATE TABLE IF NOT EXISTS channels (
    channel_id INTEGER PRIMARY KEY,
    channel_name VARCHAR(255),
    owner_id INTEGER,
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
  )`;

  let sql_subscription = `CREATE TABLE IF NOT EXISTS subscriptions (
    subscription_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    channel_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (channel_id) REFERENCES channels(channel_id)
  )`;

  db.serialize(() => {
    db.run(sql_user, (error) => {
      if (error) console.error("Error creating users table:", error.message);
    });

    db.run(sql_channel, (error) => {
      if (error) console.error("Error creating channels table:", error.message);
    });

    db.run(sql_subscription, (error) => {
      if (error) console.error("Error creating subscriptions table:", error.message);
    });
   

  });

  return db;
}

module.exports = { initDatabase };
