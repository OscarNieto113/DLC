const mysql = require('mysql2');
const config = require('../config');

//const pool = mysql.createPool({
  //  host: 'mysql-dlc.alwaysdata.net',
  //  user: 'dlc',
  //  database: 'dlc_1',
  //  password: 'MakoaGod.789'
//});

//module.exports = pool.promise();

//const mysql = require('mysql2');

//const pool = mysql.createPool({
    //host: 'localhost',
    //user: 'root',
    //database: 'dlc',
    //password: ''
//});

//module.exports = pool.promise();

const pool = mysql.createPool({
  host: config.DB_HOST,
	user: config.DB_USER,
	database: config.DB_DATABASE,
	password: config.DB_PASSWORD
});

module.exports = pool.promise();
