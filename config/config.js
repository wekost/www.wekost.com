const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "HouseRules12345",
  database: "db_widyatamakampuskos",
});

con.connect((err) => {
  if (err) {
    console.log("database tidak terkoneksi");
  }
  console.log("database terkoneksi");
});

module.exports = con;
