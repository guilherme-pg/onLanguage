// APPLICATION CUSTOMIZATION

// REQUIRE EXPRESS: return a function
const express = require('express');
// const consign = require('consign');

// TEMPLATE ENGINE
const handlebars = require('express-handlebars');
// CONVERT THE BODY DATA
const bodyParser = require('body-parser');

// ORM FOR DATABASE
const mongoose = require('mongoose');

// CALLING THE FUNCTION RETURNED BY EXPRESS
const app = express();

// RETURN CONFIGURED THE MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ADD STATIC FILES
app.use(express.static("public"));

// DATABASE CONNECTION
// mongoose.connect('mongodb://localhost:27017/wordsdata', { useNewUrlParser: true,useUnifiedTopology: true });

// IMPORTING THE ROUTS MODULE
const routes = require('../routes.js');

routes(app);

// TEMPLATE ENGINE
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
    extname: 'handlebars',
    defaultLayout: 'main',
   layoutsDir: 'src/app/views/layouts'
}));
app.set('views', 'src/app/views')


// EXPORT THE MODULE APP
module.exports = app;

// module.exports = () => {
//     app = express
//     middleware
//     routes
//     consign()
//         .include('controllers')
//         .into(app)
//     return app;
// };

