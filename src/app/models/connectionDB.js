var MongoClient  = require('mongodb').MongoClient;
//const ATLAS_URL = `${process.env.ATLAS_URL}`; //used for admin
const ATLAS_URL = "mongodb+srv://random_user:random_user_p@cluster00.puef2.mongodb.net/";


// Connect to the MONGODB ATLAS
MongoClient.connect(ATLAS_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
	
}, function (err, db) {
		if (err) throw err;
		console.log("Atlas Mongo Database CONNECTED!");
		db.close();
});


// TO IMPROVE: create a collection with does not exist
// CREATE COLLECTION
// MongoClient.connect(ATLAS_URL, {
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