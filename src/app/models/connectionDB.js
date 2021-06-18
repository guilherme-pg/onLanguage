var MongoClient  = require('mongodb').MongoClient;

var urlAtlas = 'mongodb+srv://guilhermevg:14691527@cluster00.puef2.mongodb.net/wordsdata';


// Connect to the db
MongoClient .connect(urlAtlas, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, function (err, db) {
	if (err) throw err;
	console.log("Database connected!");
	db.close();
});



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