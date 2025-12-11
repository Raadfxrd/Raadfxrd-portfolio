import mysql from "mysql2/promise";

async function createDatabase() {
  const host = process.env.DB_HOST || "localhost";
  const port = parseInt(process.env.DB_PORT || "3306");
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "admin";
  const database = process.env.DB_NAME || "portfolio";

  try {
    // Connect without database
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });

    console.log("✅ Connected to MySQL server");

    // Create database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );

    console.log(`✅ Database '${database}' created or already exists`);
    console.log("Database:", database);
    console.log("Host:", host);
    console.log("Port:", port);
    console.log("User:", user);

    await connection.end();
  } catch (error) {
    console.error("❌ Error creating database:", error);
    process.exit(1);
  }
}

createDatabase().catch(console.error);
