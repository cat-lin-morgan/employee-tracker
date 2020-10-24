//will only connect to database
const mysql = require('mysql2');

//make connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lizards333',
    database: 'employees'
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
});

module.exports = connection;

