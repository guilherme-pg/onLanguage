// const connection = require('./connectionDB');
var MongoClient  = require('mongodb').MongoClient;
var urlAtlas = `${process.env.ATLAS_URL}`;


class WordsDao {

	// READ
	read(bodyReqData) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(urlAtlas, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
				if (err) throw err;
				let dbo = db.db("wordsdata");

				// REQUIRE: CHANGE NOUN to ANY OTHER GRAMMAR CLASS
				dbo.collection("nouns")
					.find({
						name_level: {$in: bodyReqData.option_level},
						name_theme: {$in: bodyReqData.option_theme}
						
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