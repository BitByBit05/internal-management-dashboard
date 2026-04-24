import app from "./src/app.js";
import { conf } from "./src/config/config.js";

const startServer = async () => {
  //import port from .env
  const PORT = conf.port;

  app.listen(PORT, () => {
    console.log("Request recieved...");
  });
};

startServer();
