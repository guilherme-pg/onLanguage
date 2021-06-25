const { PGClient } = require('pg');



try {
	const pgclient = new PGClient({
		connectionString: process.env.DATABASE_URL,
		ssl: {
				rejectUnauthorized: false
		  	}
	});
	console.log('------->   DATABASE CONNECTED ');

} catch(err) {
	console.log('!!!!  CONNECTION DATABASE ERROR  !!!!');
	if (err) throw err;
};