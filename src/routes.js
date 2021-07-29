const dbConnection = require('./app/models/ConnectionDB');
const WordsDao = require('./app/models/DAO');
const Games = require('./app/models/Games');
const games = new Games();
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
        const wordsDao = new WordsDao(dbConnection);
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
            viewReference = "game-flashCards";

        } else if (bodyReqData.option_game == 'Write the Translation') {
            processedData = await games.write(datareturned, bodyReqData);
            viewReference = "game-write";
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

    // ROUTE: SHOW SOME DATA on the form
    app.get('/data-form-table', async function(req, resp) {
        bodyReqData = req.query;
        const wordsDao = new WordsDao(dbConnection);
        let datareturned = await wordsDao.read(bodyReqData);

        let processedData = [];   // variable repeated
        processedData = await games.tablesVisualization(datareturned, bodyReqData);

        resp.render('data-form', {
            title: "Data Form",
            layout: 'mainLayouts',
            style: "data-form.css",
            word: processedData
        });

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
    app.get('/data-tables', async function(req, resp) {
        bodyReqData = req.query;
        const wordsDao = new WordsDao(dbConnection);
        let datareturned = await wordsDao.read(bodyReqData);

        let processedData = [];   // variable repeated
        processedData = await games.tablesVisualization(datareturned, bodyReqData)

        // REQUIRE:   data sem tratamento
        resp.render('data-tables', {
            title: "Tables",
            layout: 'mainLayouts',
            style: "data-tables.css",
            word: processedData
        });

    });





    // ROUTE: about
    app.get('/info-about', function(req, resp) {
        resp.render('info-about', {
            title: "About",
            layout: 'mainLayouts',
            style: "info-about.css"
        });
    });

    // ROUTE: contact
    app.get('/info-contact', function(req, resp) {
        resp.render('info-contact', {
            title: "Contact",
            layout: 'mainLayouts',
            style: "info-contact.css"
        });
    });

    // ROUTE: parameters
    app.get('/info-parameters', function(req, resp) {
        resp.render('info-parameters', {
            title: "Parameters",
            layout: 'mainLayouts',
            style: "info-parameters.css"
        });
    });





};