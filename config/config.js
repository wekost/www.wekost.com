require('dotenv').config();
const mysql = require('mysql');

const con = mysql.createConnection(process.env.DATABASE_URL);

con.connect((err) => {
  if (err) {
    console.log('database tidak terkoneksi');
  } else {
    console.log('database terkoneksi');
  }
});

module.exports = con;
