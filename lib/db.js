import mysql from "mysql2/promise";

let connection;

export async function connectToDatabase() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || localhost  ,       
      port: process.env.MYSQL_PORT ,       
      user: process.env.MYSQL_USER || root,      
      password: process.env.MYSQL_PASSWORD || root,
      database: process.env.MYSQL_DATABASE || schools_db,  
      ssl: {
        rejectUnauthorized: true,         // make it false if you want to skip SSL verification 
      },
    });
  }
  return connection;
}
