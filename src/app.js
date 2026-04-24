import express from "express";
import { initalizeDB, showTable } from "./models/dbInitialize.js";

const app = express();
let tables = [];
let tableInfo = [];

const connectDb = async () => {
  tables = await initalizeDB();
  tableInfo = await showTable(["books"]);
};

app.get("/", (req, res) => {
  res.send("root dorectory");
  console.log("request recieved on root directory");
});

app.get("/view", async (req, res) => {
  await connectDb();
  res.json({
    allTables: tables,
    bookData: tableInfo,
  });
});

export default app;
