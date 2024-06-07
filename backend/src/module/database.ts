import mysql from "mysql2";

const urldb = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1605--Vr",
  database: "urlconvert",
});

urldb.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  if (connection) {
    console.log("DB connected");
    connection.release(); // release the connection back to the pool
  }
});

export default urldb;
