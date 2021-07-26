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

				// WORKAROUND: require: change db intermediate and advanced to merge into 'deepened'
				if (bodyReqData.option_level == 'deepened') {
					bodyReqData.option_level = ['intermediate' , 'advanced', 'deepened'];

				} else if (bodyReqData.option_level.includes('deepened')) {
					bodyReqData.option_level.push('intermediate');
					bodyReqData.option_level.push('advanced');
				};
				
				// WORKAROUND: or level and theme, or level or theme
				if (bodyReqData.option_grammar == 'verb') {     // requre: change in the db to switch 'empty' classification to verbs
					bodyReqData.option_theme = 'empty'
				};

				// WORKAROUND: some times only one value is selected to be query as an array
				if (typeof bodyReqData.option_level == 'string') {
					bodyReqData.option_level = ["none", bodyReqData.option_level];

				} else {
					bodyReqData.option_level = ["none", ...bodyReqData.option_level];
				};
				if (typeof bodyReqData.option_theme == 'string') {
					bodyReqData.option_theme = ["none", bodyReqData.option_theme];
				} else if (bodyReqData.option_theme == undefined) {
					bodyReqData.option_theme = ["none", ''];
				} else {
					bodyReqData.option_theme = ["none", ...bodyReqData.option_theme];
				};


				dbo.collection(`${bodyReqData.option_grammar}s`)
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
				console.log('DATA VISUALIZATION obj ====>>>>   ', obj);

				dbo.collection(`${obj.name_grammar}s`).insertOne(obj, function(err, res) {
					if (err) throw err;
					console.log("1 document INSERTED");

					db.close();
				});
			});
		})
  	};


 
	// UPDATE
	// update() {
	// 	return new Promise((resolve, reject) => {
	// 		MongoClient.connect(urlAtlas, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
	// 			if (err) throw err;
	// 			let dbo = db.db("wordsdata");
	// 			console.log('AAAAA DAO bodyReqData ===>>>  ', bodyReqData);

	// 			// REQUIRE: CHANGE NOUN to ANY OTHER GRAMMAR CLASS
	// 			dbo.collection("nouns")


					
	// 		});
	// 	})
	// };

  // DELETE
//   delete() {
//       return new Promise((resolve, reject) => {

//       })
//   }
};




// REQUIRE: IMPLEMENT THE DATA ACCESS TO EDIT, CREATE AND DELETE AT SAME TIME
// REQUIRE: IN DATA-FORM SHOW ALL DATA RELATED TO THE SPECIFICATIONS EACH TIME ONE IS POINTED

module.exports = WordsDao;