const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "07890Mysql!!",
    database: "blog"
});

module.exports = pool;