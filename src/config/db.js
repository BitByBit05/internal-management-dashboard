import { Pool } from "pg";
import { conf } from "./config.js";

//new connection pool
const pool = new Pool({
  user: conf.psqlUser,
  host: conf.psqlHost,
  database: conf.psqlDatabase,
  password: conf.psqlPassword,
  port: conf.psqlPort,
});

//closure
export const query = (text, params) => {
  return pool.query(text, params);
};

//end
export const end = () => {
  return pool.end();
};
