// APP: códigos de lógica da aplicação
// CONFIG: códigos de configuração da aplicação

// CUSTOM MODULE
var app = require('./config/customExpress');


// GENERATE THE GATE (dynamically for heroku)
const PORT = 8080;
app.listen(PORT, function(error){ 
    if(error) throw error 
    console.log(`SERVER running on url http://localhost:${PORT}`); 
});






// REQUIRE: SEPARATE PRODUCTION AND DEVDEVELOPMENTS CONFIGURATIONS
// REQUIRE: CHANGE DB TO POSTGRESQL AND CONNECT TO HEROKU
