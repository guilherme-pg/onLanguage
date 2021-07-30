// GLOBAL VARIABLES FROM DOM
const optionGame = document.getElementsByName('option_game');
const optionLanguage = document.getElementsByName('option_language');
const optionGrammar = document.getElementsByName('option_grammar');
const optionLevel = document.getElementsByName('option_level');
const optionTheme = document.getElementsByName('option_theme');
const methodLanguage = document.getElementsByName('option_language_method');
const optionSecondLanguage = document.getElementsByName('option2_language');

const optionFlashCards = document.getElementById('option_flash_card');
const optionHangman = document.getElementById('option_hangman');
const optionFormWords = document.getElementById('option_form_words');
const optionMemory = document.getElementById('option_memory');
const optionMultipleChoice = document.getElementById('option_multipleChoice');
const optionWriteTranslation = document.getElementById('option_write');

const titleSecondLanguage = document.getElementById('title_second_language');
const optionDual = document.getElementById('option_dual');
const optionMemoryCards = document.getElementsByName('option_cards');
const secondLanguageToHide = document.getElementsByClassName('label_option2_language');

const methodLanguageContainer = document.getElementsByClassName('method_language')[0];
const secondLanguageContainer = document.getElementsByClassName('second_language')[0];




// PREVENT NONE SELECTED
let buttonStart = document.getElementById('button_start');
buttonStart.onclick = validatioForm;

function stopDefAction(event) {
    event.preventDefault();
};

// REQUIRE: SIMPLIFICATION
function validatioForm(event) {
    let validateGameSelected = false;
    let validateLanguageSelected = false;
    let validateGrammarSelected = false;
    let validateLevelSelected = false;
    let validateThemeSelected = false;
    let validateSecondaryLanguageSelected = false;


    // VALIDATION: IF GAME SELECTED
    for (let i = 0; i < optionGame.length; i++) {
        if (optionGame[i].checked) {
            validateGameSelected = true;
        };
    };
    if (!validateGameSelected) {
        stopDefAction(event);
        alert("Need to choose a Game Option!");
    };


    // VALIDATION: IF PRIMARY LANGUAGE SELECTED
    for (let i = 0; i < optionLanguage.length; i++) {
        if (optionLanguage[i].checked) {
            validateLanguageSelected = true;
        };
    };
    if (!validateLanguageSelected) {
        stopDefAction(event);
        alert("Need to choose a Language!");
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
    

    // REQUIRE SEPARETE VALIDATION OF THE LANGUAGE METHOD FROM 2 LANGUAGE
    // VALIDATION: IF SECONDARY LANGUAGE SELECTED 
    if (optionDual.checked || optionMultipleChoice.checked || optionWriteTranslation.checked || optionFlashCards.checked) {

        for (let i = 0; i < optionSecondLanguage.length; i++) {
            
            if (optionSecondLanguage[i].checked) {
                validateSecondaryLanguageSelected = true;
            };
        };
        if (!validateSecondaryLanguageSelected) {
            stopDefAction(event);
            alert("Need to choose a Second Language option!");
        };
    };
};





// dual or single language options display
for (let i = 0; i < methodLanguage.length; i++) {
    // UNFLIPED, FLIPED AND MATCHED
    methodLanguage[i].onclick = secondLanguageDisplay;
};

function secondLanguageDisplay(event) {

    // REQUIRE: CHANGE THE DISPLAY PROPERTY TO ANOTHER THING OTHER THAN 'NONE'
    if (methodLanguage[0].checked) {
        secondLanguageContainer.style.display = "none";
    } else if (methodLanguage[1].checked == true || methodLanguage[2].checked == true) {
        secondLanguageContainer.style.display = "flex";
    };
};




// PREVENT MEMORY CARDS NUMBERS FOR EACH DIFICULT AND/OR THEME SELECTED

// REQUIRE: prevent to show only when memory is selected
// REQUIRE: prevent to to show number of options only if each theme/dificult is selected
// REQUIRE: uptade routes and DAO for number of memory cards selected
// REQUIRE:  ADD CONDITIONS TO OPTIONS


// DISPLAY CONFIGURATIONS
for (let i = 0; i < optionGame.length; i++) {
    optionGame[i].onclick = showAndHideOptions;
};



// SHOW AND HIDE OPTIONS FOR EACH GAME SELECTED
function showAndHideOptions(event) {
    
    // REQUIRE: CHANGE THE DISPLAY PROPERTY TO ANOTHER THING OTHER THAN 'NONE'
    // HIDE AND SHOW SECOND LANGUAGE AND METHOD
    if (optionMemory.checked) {
        methodLanguageContainer.classList.add('showElement');
        secondLanguageContainer.classList.add('showElement');
        titleSecondLanguage.innerText = "Second Language";

    } else if (optionFormWords.checked) {
        methodLanguageContainer.classList.remove('showElement');
        secondLanguageContainer.classList.remove('showElement');
        
        
        for (let i = 0; i < optionMemoryCards.length; i++) {optionMemoryCards[i].checked = false};
        for (let i = 0; i < methodLanguage.length; i++) {methodLanguage[i].checked = false};
        for (let i = 0; i < optionSecondLanguage.length; i++) {optionSecondLanguage[i].checked = false;};

    } else if (optionHangman.checked || optionMultipleChoice.checked || optionWriteTranslation.checked || optionFlashCards.checked) {
        
        methodLanguageContainer.classList.remove('showElement');
        secondLanguageContainer.classList.add('showElement');

        for (let i = 0; i < optionMemoryCards.length; i++) {optionMemoryCards[i].checked = false};
        for (let i = 0; i < methodLanguage.length; i++) {methodLanguage[i].checked = false};

        if (optionMultipleChoice.checked || optionWriteTranslation.checked || optionFlashCards.checked) {
            titleSecondLanguage.innerText = "Answers Language";

        } else if (optionHangman.checked) {
            titleSecondLanguage.innerText = "Support Language";
        };
    };
};




// GRAMMATICAL CLASS DISPLAY IMPLICATIONS
for (let i = 0; i < optionGrammar.length; i++) {
    optionGrammar[i].onclick = showAndHideGrammarOptions;
};

function showAndHideGrammarOptions() {
    const optionNoun = document.getElementById('option_noun');
    const optionVerb = document.getElementById('option_verb');
    // let optionAdjective = document.getElementById('option_adjective');
    // let optionAdvreb = document.getElementById('option_adverb');
    const nounThemes = document.getElementById('noun_themes');

    if (optionNoun.checked) {
        nounThemes.classList.remove('hiddenElement');

    } else if (optionVerb.checked) {
        nounThemes.classList.add('hiddenElement');
    };
};



// hide same second language when primary language selected
for (let z = 0; z < optionLanguage.length; z++) {
    
    optionLanguage[z].onclick = function () {

        // show all others secondLanguage selected and hide the same as primary selected
        if (optionLanguage[z].checked) {
            for (let w = 0; w < secondLanguageToHide.length; w++) {
                secondLanguageToHide[w].style.display = "flex";
            };
            secondLanguageToHide[z].style.display = "none";
        };
    };
};
