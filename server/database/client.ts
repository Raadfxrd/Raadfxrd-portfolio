import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

// MySQL Connection Pool
const connection = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "portfolio",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

export const db = drizzle(connection, { schema, mode: "default" });
