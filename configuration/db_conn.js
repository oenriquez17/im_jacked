require('dotenv').config();

const pg = require('pg');

const isProd = process.env.PROD == 1 ? true : false;

const user_var = isProd ? process.env.DB_USER : process.env.DEV_DB_USER;
const password_var = isProd ? process.env.DB_PASSWORD : process.env.DEV_DB_PASSWORD;
const host_var = isProd ? process.env.DB_HOST : process.env.DEV_DB_HOST;
const port_var = isProd ? process.env.DB_PORT : process.env.DEV_DB_PORT;
const database_var = isProd ? process.env.DB_DATABASE : process.env.DEV_DB_DATABASE;

const pool = new pg.Pool({
    user: user_var,
    password: password_var,
    host: host_var,
    port: port_var,
    database: database_var,
    ssl: true
});

console.log('*******DB CONFIG*********');
console.log("User: " + user_var);
console.log("Pwd: " + password_var);
console.log("Host: " + host_var);
console.log("Port: " + port_var);
console.log("Database: " + database_var);
console.log('*************************');

module.exports = {pool}