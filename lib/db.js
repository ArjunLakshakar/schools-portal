import mysql from "mysql2/promise";

let connection;

export async function connectToDatabase() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "root",
      database: process.env.MYSQL_DATABASE || "schooldb",
    });
    console.log("✅ Connected to MySQL");
  }
  return connection;
}
