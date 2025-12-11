import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { users } from "~/server/database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

async function createAdminUser() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const email = process.env.ADMIN_EMAIL || "borysbabas@pm.me";

  if (
    !process.env.ADMIN_USERNAME ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.ADMIN_EMAIL
  ) {
    console.warn(
      "⚠️  Warning: Admin credentials not found in .env file. Using default values.",
    );
    console.warn(
      "⚠️  Please set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_EMAIL in your .env file.",
    );
  }

  // MySQL Connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "portfolio",
  });

  const db = drizzle(connection, { schema: { users }, mode: "default" });

  try {
    // Check if admin already exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (existing.length > 0) {
      console.log("❌ Admin user already exists!");
      await connection.end();
      return;
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);

    await db.insert(users).values({
      username,
      password: hashedPassword,
      email,
    });

    console.log("✅ Admin user created successfully!");
    console.log("Database: MySQL");
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("⚠️  Please change the password after first login!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await connection.end();
  }
}

createAdminUser().catch(console.error);
