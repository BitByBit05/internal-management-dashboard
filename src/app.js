import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("root dorectory");
  console.log("request recieved on root directory");
});

export default app;
