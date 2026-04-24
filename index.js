import app from "./src/app.js";
import { conf } from "./src/config/config.js";
import { initalizeDB } from "./src/models/dbInitialize.js";

const startServer = async () => {
  //import port from .env
  const PORT = conf.port;
  const tables = await initalizeDB();
  console.log(tables);

  app.listen(PORT, () => {
    console.log("Request recieved...");
  });
};

startServer();
