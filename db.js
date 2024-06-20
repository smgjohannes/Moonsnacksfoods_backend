const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'otjomuise_ebc',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

module.exports = db;
