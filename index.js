require("dotenv").config();
const express = require("express");
const app = express();
const database = require("./database/db");
const userRoutes = require("./routes/user-routes");
const channelsRoutes = require("./routes/channels-routes");
const tests = require("./tests/tests");
const PORT = 8000;
const URL = "127.0.0.1";

app.use(express.json());

app.use("/api/user", userRoutes);

app.use("/api/channels", channelsRoutes);
//För att testa GET routerna
app.use("/api/test", tests);

app.listen(PORT, URL, () => {
  console.log(`listening to http://${URL}:${PORT}`);
});
