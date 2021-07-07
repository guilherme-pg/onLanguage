const dbConnection = require('./app/models/ConnectionDB');
const WordsDao = require('./app/models/DAO');
const Games = require('./app/models/Games');
const controller = require('./app/controllers/Controller')

var bodyReqData = [];
// var datareturned = [];


// REQUIRE: TITLE PAGE


module.exports = (app) => {

    // ROUTE: MAIN
    app.get('/', controller.main);


    // ROUTE: OPTIONS
    app.get('/options', controller.options);
    

    // ROUTE: GET ACTION FROM FORM (DATA SELECTED)
    app.get('/gameoptions', async function(req, resp) {

        bodyReqData = req.query;
        const games = new Games();
        const wordsDao = new WordsDao(dbConnection);

        // let datareturned = await wordsDao.optionsdata(bodyReqData);
        let datareturned = await wordsDao.read(bodyReqData);

        let viewReference = "";
        let processedData = [];

        if (bodyReqData.option_game == 'Memory') {
            processedData = await games.memory(datareturned, bodyReqData);
            viewReference = "game-memory";

        } else if (bodyReqData.option_game == 'Hangman') {
            processedData = await games.hangman(datareturned, bodyReqData);
            viewReference = "game-hangman";

        } else if (bodyReqData.option_game == 'Multiple Choice') { 
            processedData = await games.multipleChoice(datareturned, bodyReqData);
            viewReference = "game-multipleChoice";

        } else if (bodyReqData.option_game == 'Form Words') {
            processedData = await games.formWords(datareturned, bodyReqData);
            viewReference = "game-formWords";

        } else if (bodyReqData.option_game == 'Flash Cards') {
            processedData = await games.flashCard(datareturned, bodyReqData);
            viewReference = "game-flashCard";

        } else {
            processedData = await games.flashCard(datareturned, bodyReqData);
            viewReference = "game-links";
        };

        resp.render(`${viewReference}`, {
            title: `${bodyReqData.option_game}`,
            layout: 'mainLayouts',
            style: `${viewReference}.css`,
            words: processedData
        });
    });

    

    // ROUTE: FORM
    app.get('/data-form', function(req, resp) {
        resp.render('data-form', {
            title: "Data Form",
            layout: 'mainLayouts',
            style: "data-form.css"
        });
    });


    // ROUTE: CATCH THE FORM DATA
    app.post('/words', function(req, res) {
        bodyReqData = req.body;
        const wordsDao = new WordsDao(dbConnection);
        wordsDao.adding(bodyReqData)
            .then(res.redirect('/data-form'))
            .catch(erro => console.log(erro));
    });


    // ROUTE: DATA RECORD (MENU TO ACCESS DATA)
    app.get('/data-record', controller.dataRecord);
    app.get('/data-record', function(req, resp) {
        resp.render('data-record', {
            title: "Data Record",
            layout: 'mainLayouts',
            style: "data-record.css"
        });
    });
    
    
    // ROUTE: DATA SELECTED (TABLES)
    app.get('/data-tables', function(req, resp) {
        
        bodyReqData = req.query;
        console.log('BBBBB routes bodyReqData  =====>>>   ', bodyReqData)

        const wordsDao = new WordsDao(dbConnection);
        wordsDao.read(bodyReqData)
            .then(function(datareturned) {
                // wordsDao.showdata(datareturned);
                resp.render('data-tables', {
                    title: "Tables",
                    layout: 'mainLayouts',
                    style: "data-tables.css",
                    word: datareturned
                });
            })
            .catch(erro => console.log(erro));
    });





};