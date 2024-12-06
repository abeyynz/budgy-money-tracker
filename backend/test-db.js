const pool = require('./database/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection test failed:', err.stack);
  } else {
    console.log('Database connected. Current time:', res.rows[0]);
  }
  pool.end();
});
