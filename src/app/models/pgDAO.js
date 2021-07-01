const { Pool } = require('pg');
const pool = require('./pgConnectionDB.js')

console.log('+++++++ DAO CONNECTED ++++++++');


class WordsDao {

	// RETURN SELECTED DATA
	read(bodyReqData) {
		// VARIABLES ANTI-AMBIGUOUS
		let optionLanguages;
		let languagesSelectedForTables;
		let levelsSelectedforTables;


		console.log('******* DAO READ');
		console.log('BBBBBBBBBBBBB bodyReqData ===============>>>>>>>>>   ', bodyReqData);

		let primaryLanguageSelected = bodyReqData.option_language;
		let levelsSelected = bodyReqData.option_level;
		
		let themesSelected = bodyReqData.option_theme;
		let secondLanguageSelected = bodyReqData.option2_language;
		
		// DETECTING WITH THERE IS A SECOND LANGUAGE SELECTED FOR A DYNAMIC QUERY
		if (secondLanguageSelected != undefined) {
			languagesSelectedForTables = `${primaryLanguageSelected}.words`;
			optionLanguages = primaryLanguageSelected;
			levelsSelectedforTables = `${primaryLanguageSelected}.levels`;

		} else {
			languagesSelectedForTables = `${primaryLanguageSelected}.words, ${secondLanguageSelected}.words`;
			optionLanguages = `${primaryLanguageSelected}, ${secondLanguageSelected}`;
			levelsSelectedforTables = `${primaryLanguageSelected}.levels, ${secondLanguageSelected}.levels`;
		};


		return new Promise((resolve, reject) => {
			pool.connect(function (err, client, done) {
				if (err) throw err;

				pool.query(`SELECT ${languagesSelectedForTables} FROM ${optionLanguages} WHERE ${levelsSelectedforTables} IN (${levelsSelected.join()}) `, (err, res) => {
					if (err) throw err;
					
					console.log('RRRRRRRRRES ----->>>  RES  ----->>>>    ', res);

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