const mysql = require("mysql");
const pool = mysql.createPool(
    {
        "user": "root",
        "password": "",
        "database": "agencia_bancaria",
        "host": "localhost",
        "port": 3306,
    
    }
);

exports.pool = pool;
