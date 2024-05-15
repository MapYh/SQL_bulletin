const sqlite3 = require("sqlite3").verbose();

//Creates the different tables and inits the database.
function createDatabase() {
  //Inits database.
  const db = new sqlite3.Database("./model/database.db", (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Created database.");
    }
  });

  //Creates the tables.
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY, userFirstName TEXT, userLastName TEXT, userNickName TEXT, password TEXT)"
    )
      .run(
        "CREATE TABLE IF NOT EXISTS channel (channelId INTEGER PRIMARY KEY, userName TEXT, ownerId INTEGER, FOREIGN KEY(ownerId) REFERENCES users(userId))"
      )
      .run(
        "CREATE TABLE IF NOT EXISTS message(messageId INTEGER PRIMARY KEY, messageContent TEXT, date TEXT, userId INTEGER, channelId INTEGER, FOREIGN KEY(channelId) REFERENCES channel(channelId), FOREIGN KEY(userId) REFERENCES users(userId))"
      )
      .run(
        "CREATE TABLE IF NOT EXISTS subscription(subscriptionId INTEGER PRIMARY KEY, channelId INTEGER, userId INTEGER, FOREIGN KEY(channelId) REFERENCES channel(channelId), FOREIGN KEY(userId) REFERENCES users(userId))",
        () => {
          console.log("Created tables.");
        }
      );
  });
}

module.exports = { createDatabase };
