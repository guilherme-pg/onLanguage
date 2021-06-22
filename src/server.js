// APP: códigos de lógica da aplicação
// CONFIG: códigos de configuração da aplicação

// CUSTOM MODULE
var app = require('./config/customExpress');
// const customExpress = require('./controllers/config/customExpress');
// const app = customExpress();


// GENERATE THE GATE
app.listen(8080, function(error){ 
    if(error) throw error 
    console.log("SERVER running on url http://localhost:8080"); 
});

// package.json
// "start": "npm-run-all -p nodemon browsersync",
// 	"nodemon": "nodemon src/server.js",
// 	"browsersync": "browser-sync start --proxy http://localhost:8080 --file 'public, src/app/views'"