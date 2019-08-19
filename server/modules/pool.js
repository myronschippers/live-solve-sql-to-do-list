const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app', // the name of database, This can Change!
    host: 'localhost', // where is the database (changes when you deploy)
    port: 5432, // the port for your database, 5432 is default Postgres port
    max: 10, // how many connections (queries) at one time
    idleTimeoutMillis: 30000, // 30 second to try to connect, otherwise cancel query (value is in milliseconds)
});

module.exports = pool;