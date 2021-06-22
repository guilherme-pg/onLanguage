// APP: códigos de lógica da aplicação
// CONFIG: códigos de configuração da aplicação

// CUSTOM MODULE
var app = require('./config/customExpress');
// const customExpress = require('./controllers/config/customExpress');
// const app = customExpress();


// GENERATE THE GATE
const PORT = process.env.PORT || 8080;
app.listen(PORT, function(error){ 
    if(error) throw error 
    console.log(`SERVER running on url http://localhost:${PORT}`); 
});




// REQUIRE: ENABLE USE HEROKU WITH NODEMON AND BROWWERSYNC
// package.json CONFIGURATIONS BEFORE DELETE NODEMON AND BROWSERSYNC FOR HEROKU
// {
// 	"name": "onlanguages",
// 	"version": "1.0.0",
// 	"description": "",
// 	"main": "server.js",
// 	"scripts": {
// 		"test": "echo \"Error: no test specified\" && exit 1",
// 		"start": "node src/server.js",
// 		"start:dev": "npm-run-all -p nodemon browsersync",
// 		"nodemon": "nodemon src/server.js",
// 		"browsersync": "browser-sync start --proxy http://localhost:8080 --file 'public, src/app/views'"
// 	},
// 	"author": "Guilherme Peixoto Guimarães",
// 	"license": "ISC",
// 	"dependencies": {
// 		"body-parser": "^1.19.0",
// 		"consign": "^0.1.6",
// 		"express": "^4.17.1",
// 		"express-handlebars": "^5.2.0",
// 		"mongodb": "^3.6.2",
// 		"mongoose": "^5.10.12",
// 		"pg": "^8.6.0"
// 	},
// 	"devDependencies": {
// 		"npm-run-all": "^4.1.5",
// 		"browser-sync": "^2.26.14",
// 		"nodemon": "^2.0.6"		
// 	}
// }