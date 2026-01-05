const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_widyatamakampuskos",
  port: 3306,
});

con.connect((err) => {
  if (err) {
    console.log("database tidak terkoneksi");
  } else {
    console.log("database terkoneksi");
  }
});

module.exports = con;
