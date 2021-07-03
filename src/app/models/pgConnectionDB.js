const { Pool } = require('pg');
const connectionString = process.env.PGDATABASE_URL;


const pool = new Pool({
	connectionString: connectionString,
	ssl: {
			rejectUnauthorized: false
		}
});

module.exports = pool;