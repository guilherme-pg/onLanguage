const { Pool } = require('pg');
const pool = require('./pgConnectionDB.js')

console.log('+++++++ DAO CONNECTED ++++++++');


class WordsDao {

	// RETURN SELECTED DATA
	read(bodyReqData) {
		console.log('******* DAO READ');

		return new Promise((resolve, reject) => {
			pool.connect(function (err, client, done) {
				if (err) throw err;

				pool.query('SELECT * FROM english', (err, res) => {
					if (err) throw err;
					
					console.log('RES ----->>>    ----->>>>    ', res);

					let dataset = res;

					return resolve(dataset);
				})
			});
		})
	};



	// ADD NEW WORDS
	create(bodyReqData) {
		console.log('******* DAO CREATION');

		return new Promise((resolve, reject) => {
			Pool.connect();
			
		})
	};



	// CHANGE PREVIOUS ADDED DATA
	update(bodyReqData) {
		console.log('******* DAO UPDATE');

		return new Promise((resolve, reject) => {
			Pool.connect();
			
		})
	};



	// DELETE DATA
	delete(bodyReqData) {
		console.log('******* DAO DELETE');

		return new Promise((resolve, reject) => {
			Pool.connect();
			
		})
	};
};
module.exports = WordsDao;