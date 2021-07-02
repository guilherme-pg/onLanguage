const { Pool } = require('pg');
const pool = require('./pgConnectionDB.js')

console.log('+++++++ DAO CONNECTED ++++++++');


class WordsDao {

	// RETURN SELECTED DATA
	read(bodyReqData) {
		// VARIABLES ANTI-AMBIGUOUS
		let optionLanguages;
		let languagesSelectedForTables;
		let levelsSelectedForTables;
		let themesSelectedForTables;


		console.log('******* DAO READ');
		console.log('BBBBBBBBBBBBB bodyReqData ===============>>>>>>>>>   ', bodyReqData);

		let primaryLanguageSelected = bodyReqData.option_language;
		let secondLanguageSelected = bodyReqData.option2_language;

		let levelsSelected = bodyReqData.option_level;
		let themesSelected = bodyReqData.option_theme;
		console.log('LLLLLLLLLLLL levelsSelected ==========>>>>>>>>>   ', levelsSelected);
		console.log('TTTTTTTTTTTT themesSelected ===============>>>>>>>>>   ', themesSelected);
		

		// DETECTING IF THERE IS A SECOND LANGUAGE SELECTED FOR A DYNAMIC QUERY
		if (secondLanguageSelected != undefined) {

			optionLanguages = primaryLanguageSelected;
			languagesSelectedForTables = `${primaryLanguageSelected}.words`;
			levelsSelectedForTables = `${primaryLanguageSelected}.levels`;
			themesSelectedForTables = `${primaryLanguageSelected}.themes`;

		} else {
			optionLanguages = `${primaryLanguageSelected}, ${secondLanguageSelected}`;
			languagesSelectedForTables = `${primaryLanguageSelected}.words, ${secondLanguageSelected}.words`;
			levelsSelectedForTables = `${primaryLanguageSelected}.levels, ${secondLanguageSelected}.levels`;
			themesSelectedForTables = `${primaryLanguageSelected}.themes, ${secondLanguageSelected}.themes`;
		};

		// REQUIRE: THEMES AND LEVELS ARRAYS OF VALUES TO QUERY

		return new Promise((resolve, reject) => {
			pool.connect(function (err, client, done) {
				if (err) throw err;

				pool.query(`SELECT * FROM ${optionLanguages} WHERE EXISTS (
					SELECT levels FROM ${optionLanguages} WHERE 
				) `, (err, res) => {
					if (err) throw err;
					
					console.log('RRRRRRRRRES ----->>>  RES  ----->>>>    ', res);

					let dataset = res;

					return resolve(dataset);
				})
			});
		})
	};
	// `SELECT ${languagesSelectedForTables}, ${themesSelectedForTables}, ${levelsSelectedForTables} FROM ${optionLanguages} WHERE ${levelsSelectedForTables} IN (${levelsSelected.join()}) `


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