//will only connect to database

const mysql = require('mysql2');

//make connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});

