//named imports
import { query } from "../config/db.js";

export const dbInitalize = {
  getTables:
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
  showTable: "SELECT * FROM $1",
};

export const initalizeDB = async () => {
  const { rows } = await query(dbInitalize.getTables); //object destruction(will only pick the rows attr)
  return rows;
};
