const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:"Swapnil@123",
  database: 'hotel_booking',
});

module.exports=connection;


