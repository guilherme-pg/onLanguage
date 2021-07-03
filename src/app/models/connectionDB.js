var MongoClient  = require('mongodb').MongoClient;
var urlAtlas = `${process.env.ATLAS_URL}`;


// Connect to the db
MongoClient.connect(urlAtlas, {
	useNewUrlParser: true,
	useUnifiedTopology: true
	
}, function (err, db) {
		if (err) throw err;
		console.log("Atlas Mongo Database CONNECTED!");
		db.close();
});


// REQUIRE: OPTIMIZE DB FOR ONE COLLECTION ONLY OR OPTIMIZE COLLECTION CREATION

// CREATE COLLECTION
// MongoClient.connect(urlAtlas, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
//   }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("wordsdata");

//     dbo.createCollection("clothes", function(err, res) {
//       if (err) throw err;
//       console.log("Collection clothes created!");
//       db.close();
//     });
// });