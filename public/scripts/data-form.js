





























// OLD VERSION






// GENERAL VARIABLES
var theme = '';
var level = '';
var grammar = '';
var artSpan;
var wordSpan;
var spanGend;
var artPort;
var wordPort;
var portGend;
var artItal;
var wordItal;
var italGend;
var artGerm;
var wordGerm;
var germGend;
var artFren;
var wordFren;
var frenGend;
var artEng;
var wordEng;
var engGend;




function setObject() {

    // CREATE OR THROW THE DATA IN THE FILE

    let file = 'dataLanguage.txt';
    let data = DYNAMICALY_VARIABLE;
    const callback = (err) => {
        if (err) throw err;
        console.log('Saved!');
    };

    fs.appendFile(file, data, callback);

    // require: create a VAR dynamically to set the object numerically;
    // require: create a DATA to store all the VARs;
    // require: acess the data and count how many VARs are there;
    // prevent: if no DATA, create;
    // require: store the DATA;

    // ACCESS AND READ THE FILE.TXT


    var DYNAMICALY_VARIABLE = new DataWord(theme, level, grammar, artEng, wordEng, engGend, artFren, wordFren, frenGend, artGerm, wordGerm, germGend, artItal, wordItal, italGend, artPort, wordPort, portGend, artSpan, wordSpan, spanGend);
};

class DataWord {
    createObject(theme, level, grammar, artEng, wordEng, engGend, artFren, wordFren, frenGend, artGerm, wordGerm, germGend, artItal, wordItal, italGend, artPort, wordPort, portGend, artSpan, wordSpan, spanGend) {
        this.theme = theme, 
        this.level = level, 
        this.grammar = grammar, 
        this.english = {
            art_eng: artEng, 
            word_eng: wordEng, 
            gend_eng: engGend}, 
        this.french = {
            art_fren: artFren, 
            word_fren: wordFren, 
            gend_fren: frenGend}, 
        this.german = {
            art_germ: artGerm, 
            word_germ: wordGerm, 
            gend_germ: germGend}, 
        this.italian = {
            art_ital: artItal, 
            word_ital: wordItal, 
            gend_ital: italGend}, 
        this.portuguese = {
            art_port: artPort, 
            word_port: wordPort, 
            gend_port: portGend}, 
        this.spanish = {
            art_span: artSpan, 
            word_span: wordSpan, 
            gend_span: spanGend}
    };
};



function wordEnglish() {
    artEng = document.getElementById('art_eng').value;
    wordEng = document.getElementById('word_eng').value;

    let optEngGend = document.getElementById('english_gender');
    engGend = optEngGend.options[optEngGend.selectedIndex].value;
};

function wordFrench() {
    artFren = document.getElementById('art_fren').value;
    wordFren = document.getElementById('word_fren').value;

    let optFrenGend = document.getElementById('french_gender');
    frenGend = optFrenGend.options[optFrenGend.selectedIndex].value;
};

function wordGerman() {
    artGerm = document.getElementById('art_germ').value;
    wordGerm = document.getElementById('word_germ').value;

    let optGermGend = document.getElementById('german_gender');
    germGend = optGermGend.options[optGermGend.selectedIndex].value;
};

function wordItalian() {
    artItal = document.getElementById('art_ital').value;
    wordItal = document.getElementById('word_ital').value;

    let optItalGend = document.getElementById('italian_gender');
    italGend = optItalGend.options[optItalGend.selectedIndex].value;
};

function wordPortuguese() {
    artPort = document.getElementById('art_port').value;
    wordPort = document.getElementById('word_port').value;

    let optPortGend = document.getElementById('portuguese_gender');
    portGend = optPortGend.options[optPortGend.selectedIndex].value;
};

function wordSpanish() {
    artSpan = document.getElementById('art_span').value;
    wordSpan = document.getElementById('word_span').value;

    let optSpanGend = document.getElementById('spanish_gender');
    spanGend = optSpanGend.options[optSpanGend.selectedIndex].value;
};





function wordGrammar() {
    let inputGrammar = document.getElementById('input_grammar');
    grammar = inputGrammar.options[inputGrammar.selectedIndex].value;
};

function wordLevel() {
    let inputLevel = document.getElementById('input_level');
    level = inputLevel.options[inputLevel.selectedIndex].value;
};

function wordTheme() {
    let inputTheme = document.getElementById('input_theme');
    theme = inputTheme.options[inputTheme.selectedIndex].value;
};





function dataSet() {

    wordTheme();
    wordLevel();
    wordGrammar();

    wordEnglish();
    wordFrench();
    wordGerman();
    wordItalian();
    wordPortuguese();
    wordSpanish();

    setObject();
};

document.getElementById('button_register').addEventListener('click', dataSet);