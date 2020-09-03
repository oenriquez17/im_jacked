require('dotenv').config();

const pg = require('pg');

const pool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

console.log('*******DB CONFIG*********');
console.log("User: " + process.env.DB_USER);
console.log("Pwd: " + process.env.DB_PASSWORD);
console.log("Host: " + process.env.DB_HOST);
console.log("Port: " + process.env.DB_PORT);
console.log("Database: " + process.env.DB_DATABASE);
console.log('*************************');

module.exports = {pool}