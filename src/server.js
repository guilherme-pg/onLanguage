// APP: códigos de lógica da aplicação
// CONFIG: códigos de configuração da aplicação

// CUSTOM MODULE
var app = require('./config/customExpress');

// CUSTOM MODULE
// const customExpress = require('./controllers/config/customExpress');
// const app = customExpress();

// GENERATE THE GATE
app.listen(8080, function(error){ 
    if(error) throw error 
    console.log("SERVIDOR rodando na url http://localhost:8080"); 
});
