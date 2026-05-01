import express from "express";
import {
  getByTableName,
  initalizeDB,
  getAuthor,
} from "./models/dbInitialize.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("root dorectory");
  console.log("request recieved on root directory");
});

app.get("/view", async (req, res) => {
  let tables = await initalizeDB();
  res.json({
    allTables: tables,
  });
});

app.post("/view", async (req, res) => {
  let tableName = req.body.tableName;
  let tableInfo = await getByTableName(tableName);
  res.json({
    table: tableInfo,
  });
});

app.post("/author", async (req, res) => {
  let authorName = req.body.authorName;
  let author = await getAuthor(authorName);
  res.json({
    author: author,
  });
});

export default app;
