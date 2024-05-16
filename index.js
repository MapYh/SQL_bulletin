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

app.get("/api/channels", (req, res) => {
  db.get("SELECT channel_name FROM channels", function (error, rows) {
    if (error) {
      console.error(error);
    } else {
      res.status(200).json(rows);
    }
  });
});
