const database = require("./model/database");
const express = require("express");

const app = express();
app.use(express.json());
const PORT = 8000;
const URL = "127.0.0.1";

app.listen(PORT, URL, () => {
  console.log(`Listening for http://${URL}:${PORT}`);
});

const db = database.createDatabaseAndTables();
