// APP: códigos de lógica da aplicação
// CONFIG: códigos de configuração da aplicação

// CUSTOM MODULE
var app = require('./config/customExpress');



// GENERATE THE GATE (dynamically for heroku)
const PORT = process.env.PORT;
app.listen(PORT, function(error){ 
    if(error) throw error 
    console.log(`SERVER running on url http://localhost:${PORT}`); 
});






// REQUIRE: SEPARATE PRODUCTION AND DEVDEVELOPMENTS CONFIGURATIONS
// REQUIRE: CONNECT TO POSTREGSQL ON HEROKU
