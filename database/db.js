const sqlite = require("sqlite3").verbose();

function initDatabase() {
  const db = new sqlite.Database("./database/database.db", (error) => {
    if (error) return console.log(error);
    console.log("Connected to database");
  });

  let sql_user = `CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY, 
    user_name VARCHAR(255),
    user_lastname VARCHAR(255), 
    user_nickname VARCHAR(255),
    user_password BLOB,
    user_location TEXT,
    user_email TEXT UNIQUE
    )`;

       db.serialize(() => {
        db.run(sql_user, (error) => {
          if (error) console.error("Error creating users table:", error.message);
        });
    });
  return db;
}

module.exports = { initDatabase };
