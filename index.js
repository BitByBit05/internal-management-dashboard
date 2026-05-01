import app from "./src/app.js";
import { conf } from "./src/config/config.js";
import "dotenv/config";

const startServer = async () => {
  //import port from .env
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
