const { PGClient } = require('pg');
import { pgclient } from 'newConnectionDB.js';


console.log('+++++++ DAO CONNECTED ++++++++');


class NewWordsDao {

	// ADD NEW WORDS
	create(bodyReqData) {
		console.log('******* DAO CREATION');

		return new Promise((resolve, reject) => {
			pgclient.connect();
			
		})
	};

	// RETURN SELECTED DATA
	read(bodyReqData) {
		console.log('******* DAO READ');

		return new Promise((resolve, reject) => {
			pgclient.connect();
			
		})
	};

	// CHANGE PREVIOUS ADDED DATA
	update(bodyReqData) {
		console.log('******* DAO UPDATE');

		return new Promise((resolve, reject) => {
			pgclient.connect();
			
		})
	};

	// DELETE DATA
	delete(bodyReqData) {
		console.log('******* DAO DELETE');

		return new Promise((resolve, reject) => {
			pgclient.connect();
			
		})
	};



	// CHOOSED OPTIONS
	option(bodyReqData) {
		console.log('******* DAO OPTION');

		return new Promise((resolve, reject) => {
			pgclient.connect();
			
		})
	};




};
module.exports = NewWordsDao;