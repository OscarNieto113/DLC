const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql-dlc.alwaysdata.net',
    user: 'dlc',
    database: 'dlc_1',
    password: 'MakoaGod.789'
});

//module.exports = pool.promise();

//const mysql = require('mysql2');

//const pool = mysql.createPool({
    //host: 'localhost',
    //user: 'root',
    //database: 'dlc',
    //password: ''
//});

module.exports = pool.promise();
