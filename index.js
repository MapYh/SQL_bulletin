const express = require("express");
const app = express();
const database = require("./database/db");
const userRoutes = "./routes/user-routes";
const channelsRoutes = "./routes/channels-routes";
const PORT = 8000;
const URL = "127.0.0.1";
const db = database.initDatabase();

app.use(express.json());
/* 
app.use("/api/user", userRoutes);
app.use("/api/channels", channelsRoutes);
*/

app.listen(PORT, URL, () => {
  console.log(`listenting to http://${URL}:${PORT}`);
});

/*-------GET----------- */

//GET all channels by channel name.
app.get("/api/channels", (req, res) => {
  db.all("SELECT channel_name FROM channels", function (error, rows) {
    if (error) {
      console.error(error);
    } else {
      res.status(200).json(rows);
    }
  });
});

//GET all users by username.
app.get("/api/user", (req, res) => {
  db.all("SELECT user_name FROM users", function (error, rows) {
    if (error) {
      console.error(error);
    } else {
      res.status(200).json(rows);
    }
  });
});

/*-------POST----------- */
//Exists to test the GET routes.
app.post("/api/channels", (req, res) => {
  const { channel_id, channel_name, channel_owner_id } = req.body;
  db.run(
    "INSERT INTO channels (channel_id, channel_name, channel_owner_id) VALUES (?, ?, ?) ",
    [channel_id, channel_name, channel_owner_id],
    function (error, rows) {
      if (error) {
        console.error(error);
      } else {
        res.status(200).json({ success: true, message: "Added a channel." });
      }
    }
  );
});

app.post("/api/user", (req, res) => {
  const {
    user_id,
    user_name,
    user_lastname,
    user_nickname,
    user_password,
    user_location,
    user_email,
  } = req.body;
  db.run(
    "INSERT INTO users ( user_id, user_name, user_lastname, user_nickname, user_password, user_location, user_email) VALUES (?, ?, ?, ?, ?, ?, ?) ",
    [
      user_id,
      user_name,
      user_lastname,
      user_nickname,
      user_password,
      user_location,
      user_email,
    ],
    function (error, rows) {
      if (error) {
        console.error(error);
      } else {
        res.status(200).json({
          success: true,
          message: `Added user ${user_name} to the database.`,
        });
      }
    }
  );
});
