const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'stocks',
  });
  

module.exports = connection;
  