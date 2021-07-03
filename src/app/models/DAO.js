// const connection = require('./connectionDB');
var MongoClient  = require('mongodb').MongoClient;
var urlAtlas = `${process.env.ATLAS_URL}`;




class WordsDao {

	// PROCESS OPTIONS DATA WITH: THEME AND LEVEL (next grammarclass)
	optionsdata(bodyReqData) {

		// PROBLEM: REQUIRE at least ONE VALUE or an ARRAY IN THE QUERY
		return new Promise((resolve, reject) => {
			MongoClient.connect(urlAtlas, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
				if (err) throw err;
				let dbo = db.db("wordsdata");

				// PROBLEM: returning only the first theme selected
				console.log('bodyReqData.option_theme AAAAAAAA  ==== ', bodyReqData.option_theme);



				dbo.collection(`${bodyReqData.option_theme[0]}`)
					.find({
						name_level: {$in: bodyReqData.option_level},
						name_theme: {$in: bodyReqData.option_theme}
					})
					.toArray(function(err, result) {
					if (err) throw err;
					
						db.close();
						return resolve(result);
					});
			});
		})
  	};



	// READ
	read(bodyReqData) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(urlAtlas, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
				if (err) throw err;
				let dbo = db.db("wordsdata");

				console.log('RRRRRRR bodyReqData ======>>>>>   ', bodyReqData);

				// REQUIRE: CHANGE NOUN
				dbo.collection(`nouns`)
					.find({
						name_theme: bodyReqData.name_theme,
						name_level: bodyReqData.name_level
						
					}).toArray(function(err, result) {
						if (err) throw err;	

						db.close();
						return resolve(result);
					});
			});
		});
  	};



  
  	// INSERT/CREATE
  	adding(bodyReqData) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(urlAtlas, {useNewUrlParser: true,  useUnifiedTopology: true}, function(err, db) {
				if (err) throw err;
				let dbo = db.db("wordsdata");
				let obj = bodyReqData;

				dbo.collection(`${bodyReqData.name_theme}`).insertOne(obj, function(err, res) {
					if (err) throw err;
					// console.log("1 document inserted");

					db.close();
				});
			});
		})
  	};

 
  // UPDATE
  // update() {
  //     return new Promise((resolve, reject) => {
  //     })
  // }

  // DELETE
  // delete() {
  //     return new Promise((resolve, reject) => {
  //     })
  // }
}



// REQUIRE: FIX THE THEME QUERY TO ALL THEMES REQUIRED OR CHANGE THE COLLECTIONS TO ONLY ONE
// REQUIRE: IMPLEMENT THE DATA ACCESS TO EDIT, CREATE AND DELETE AT SAME TIME
// REQUIRE: IN DATA-FORM SHOW ALL DATA RELATED TO THE SPECIFICATIONS EACH TIME ONE IS POINTED

module.exports = WordsDao;