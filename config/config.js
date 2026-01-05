require('dotenv').config();
const mysql = require('mysql2');

const con = mysql.createPool(process.env.DATABASE_URL);

con.getConnection((err, connection) => {
  if (err) {
    console.error('database tidak terkoneksi', err);
  } else {
    console.log('database terkoneksi');
    connection.release();
  }
});

module.exports = con;
