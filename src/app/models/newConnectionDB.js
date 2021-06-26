const { PGClient } = require('pg');


export const pgclient = new PGClient({
	connectionString: process.env.DATABASE_URL,
	ssl: {
			rejectUnauthorized: false
		}

}, function (err, db) {
	if (err) {
		console.log("------->   DATABASE  -- NOT -- CONNECTED ");
		throw err;
	} else {
		console.log("------->   DATABASE CONNECTED ");
	}
});