const mysql = require('mysql');
require('dotenv').config();

const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
})

mysqlConnection.connect( (err) => {
    if(err){
        console.log(err);
        return err;
    } else{
        console.log('Successful connection!');
    }
})

module.exports = mysqlConnection;