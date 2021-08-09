const optionGrammar = document.getElementsByName('option_grammar');
const optionLevel = document.getElementsByName('option_level');
const optionTheme = document.getElementsByName('option_theme');

const optionGrammarVerb = document.getElementById('option_verb');
const nounThemes = document.getElementById('noun_themes');

const optionLanguage = document.getElementsByName('option_language');
const optionSecondLanguage = document.getElementsByName('option2_language');

const secondLanguageToHide = document.getElementsByClassName('label_option2_language');
const firstLanguageToHide = document.getElementsByClassName('label_option_language');


// VALIDATION
let buttonCheck = document.getElementById('button_check_data');
buttonCheck.onclick = validatioForm;

function stopDefAction(event) {
    event.preventDefault();
};

function validatioForm() {
    let validateLanguageSelected = false;
    let validateGrammarSelected = false;
    let validateLevelSelected = false;
    let validateThemeSelected = false;
    let validateSecondaryLanguageSelected = false;

    // VALIDATION: IF PRIMARY LANGUAGE SELECTED
    for (let i = 0; i < optionLanguage.length; i++) {
        if (optionLanguage[i].checked) {
            validateLanguageSelected = true;
        };
    };
    if (!validateLanguageSelected) {
        stopDefAction(event);
        alert("Need to choose the first Language!");
    };


    // VALIDATION: IF SECONDARY LANGUAGE SELECTED
    for (let i = 0; i < optionSecondLanguage.length; i++) {
        if (optionSecondLanguage[i].checked) {
            validateSecondaryLanguageSelected = true;
        };
    };
    if (!validateSecondaryLanguageSelected) {
        stopDefAction(event);
        alert("Need to choose the second Language!");
    };


    // VALIDATION: IF GRAMMATICAL CLASS SELECTED
    for (let i = 0; i < optionGrammar.length; i++) {
        if (optionGrammar[i].checked) {
            validateGrammarSelected = true;
        };
    };
    if (!validateGrammarSelected) {
        stopDefAction(event);
        alert("Need to choose a Grammatical Class!");
    };


    // VALIDATION: IF LEVEL SELECTED 
    for (let i = 0; i < optionLevel.length; i++) {
        if (optionLevel[i].checked) {
            validateLevelSelected = true;
        };
    };
    if (!validateLevelSelected) {
        stopDefAction(event);
        alert("Need to choose at least one Level option!");
    };

    
    // VALIDATION: IF SELECTED THEME
    for (let i = 0; i < optionTheme.length; i++) {
        if (optionTheme[i].checked) {
            validateThemeSelected = true;
        };
    };
    if (!validateThemeSelected) {
        stopDefAction(event);
        alert("Need to choose at least one Theme option!");
    };
};







// change display for grammar option selected
function switchGrammarDisplay() {
    for (let i = 0; i < optionGrammar.length; i++) {
        if (optionGrammarVerb.checked) {
            nounThemes.classList.add('hiddenElement');
        } else {
            nounThemes.classList.remove('hiddenElement');
        };
    };
};
for (let i = 0; i < optionGrammar.length; i++) {
    optionGrammar[i].onclick = switchGrammarDisplay;
};



function changeLanguageDisplay() {
    // show all others secondLanguage selected and hide the same as primary selected
    for (let z = 0; z < optionLanguage.length; z++) {
        if (optionLanguage[z].checked) {
            for (let w = 0; w < secondLanguageToHide.length; w++) {
                secondLanguageToHide[w].classList.remove('hiddenElement');
            };
            secondLanguageToHide[z].classList.add('hiddenElement');
        };

        if (optionSecondLanguage[z].checked) {
            for (let w = 0; w < firstLanguageToHide.length; w++) {
                firstLanguageToHide[w].classList.remove('hiddenElement');
            };
            firstLanguageToHide[z].classList.add('hiddenElement');
        };
    };
};


// hide same second language when primary language selected
for (let z = 0; z < optionLanguage.length; z++) {
    optionLanguage[z].onclick = changeLanguageDisplay;
    optionSecondLanguage[z].onclick = changeLanguageDisplay;
};
