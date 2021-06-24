const { PGClient } = require('pg');




try {
	let pgclient = new PGClient({
		connectionString: process.env.DATABASE_URL,
        ssl: {
			rejectUnauthorized: false
		  }
	});
} catch(err) {
	console.log('!!!!  CONNECTION DATABASE ERROR  !!!!');
	throw err;
};
