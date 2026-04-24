//named imports
import { query } from "../config/db.js";

export const dbInitalize = {
  getTables: `
    SELECT schemaname, tablename 
    FROM pg_catalog.pg_tables 
    WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
  `,
};

export const initalizeDB = async () => {
  const { rows } = await query(dbInitalize.getTables); //object destruction(will only pick the rows attr)
  return rows;
};

export const showTable = async (name) => {
  const { rows } = await query(`SELECT * FROM ${name}`);
  return rows;
};
