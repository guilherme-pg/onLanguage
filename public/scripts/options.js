// GLOBAL VARIABLES FROM DOM
const optionGame = document.getElementsByName('option_game');
const optionLanguage = document.getElementsByName('option_language');
const optionGrammar = document.getElementsByName('option_grammar');
const optionLevel = document.getElementsByName('option_level');
const optionTheme = document.getElementsByName('option_theme');
const methodLanguage = document.getElementsByName('option_language_method');
const optionSecondLanguage = document.getElementsByName('option2_language');

const optionHangman = document.getElementById('option_hangman');
const optionFormWords = document.getElementById('option_form_words');
const optionMemory = document.getElementById('option_memory');
const optionMultipleChoice = document.getElementById('option_multipleChoice');

const titleSecondLanguage = document.getElementById('title_second_language');
const optionDual = document.getElementById('option_dual');
const optionMemoryCards = document.getElementsByName('option_cards');
const secondLanguageToHide = document.getElementsByClassName('label_option2_language');

const memoryGameOption = document.getElementById('memory_cards_options');
const secondLanguageContainer = document.getElementById('second_language');
const methodLanguageContainer = document.getElementById('method_language');



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
    if (optionDual.checked || optionMultipleChoice.checked) {

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

memoryGameOption.style.display = "none";
secondLanguageContainer.style.display = "none";
methodLanguageContainer.style.display = "none";

// SHOW AND HIDE OPTIONS FOR EACH GAME SELECTED
function showAndHideOptions(event) {
    
    // REQUIRE: CHANGE THE DISPLAY PROPERTY TO ANOTHER THING OTHER THAN 'NONE'7
    // HIDE AND SHOW SECOND LANGUAGE AND METHOD
    if (optionMemory.checked) {
        memoryGameOption.style.display = "flex";
        secondLanguageContainer.style.display = "flex";
        methodLanguageContainer.style.display = "flex";
        titleSecondLanguage.innerText = "Second Language";

    } else if (optionHangman.checked == true || optionFormWords.checked == true) {
        secondLanguageContainer.style.display = "none";
        methodLanguageContainer.style.display = "none";
        memoryGameOption.style.display = "none";
        
        for (let i = 0; i < optionMemoryCards.length; i++) {optionMemoryCards[i].checked = false};
        for (let i = 0; i < methodLanguage.length; i++) {methodLanguage[i].checked = false};
        for (let i = 0; i < optionSecondLanguage.length; i++) {optionSecondLanguage[i].checked = false;};

    } else if (optionMultipleChoice.checked) {
        methodLanguageContainer.style.display = "none";
        memoryGameOption.style.display = "none";
        secondLanguageContainer.style.display = "flex";

        for (let i = 0; i < optionMemoryCards.length; i++) {optionMemoryCards[i].checked = false};
        for (let i = 0; i < methodLanguage.length; i++) {methodLanguage[i].checked = false};
        titleSecondLanguage.innerText = "Answers Language";
    };
};


// NOT WORKING
// REQUIRE: SIMPLIFICATION
// PREVENT THE NUMBER OF CARDS CHOOSED OF THE MEMORY GAME EXCEED THE NUMBER OF POSSIBILITIES
function numberOfMemoryCards() {

    // NUMBER OF MEMORY CARDS: LABELS
    const labelOptionCards12 = document.getElementById('label_option_cards_12');
    const labelOptionCards16 = document.getElementById('label_option_cards_16');
    const labelOptionCards20 = document.getElementById('label_option_cards_20');
    const labelOptionCards24 = document.getElementById('label_option_cards_24');
    labelOptionCards12.style.opacity = "0.5";
    labelOptionCards16.style.opacity = "0.5";
    labelOptionCards20.style.opacity = "0.5";
    labelOptionCards24.style.opacity = "0.5";

    // DISABLE THE NUMBERS: THE BUTTON
    const optionCards12 = document.getElementById('option_cards_12');
    const optionCards16 = document.getElementById('option_cards_16');
    const optionCards20 = document.getElementById('option_cards_20');
    const optionCards24 = document.getElementById('option_cards_24');
    optionCards12.disabled = true;
    optionCards16.disabled = true;
    optionCards20.disabled = true;
    optionCards24.disabled = true;

    // DEPENDENCE FROM THE NUMBER OF LEVELS AND THEMES SELECTED
    for (let i = 0; i < optionLevel.length; i++) {
        optionLevel[i].onclick = numberOfMemoryCards;
    };
    for (let i = 0; i < optionTheme.length; i++) {
        optionTheme[i].onclick = numberOfMemoryCards;
    };


    let optionLevelChecked = 0;
    let optionThemeChecked = 0;
    for (let i = 0; i < optionLevel.length; i++) {
        if (optionLevel[i].checked) {
            optionLevelChecked++  
        };
    };
    for (let i = 0; i < optionTheme.length; i++) {
        if (optionTheme[i].checked) {
            optionThemeChecked++
        };
    };


    let levelAndThemeChecked = optionLevelChecked + optionThemeChecked;

    // IMPLICATIONS: ARRUMADINHO
    if (optionLevelChecked == 3 && optionThemeChecked == 2 || optionThemeChecked == 3 && optionLevelChecked == 2) {
        labelOptionCards12.style.opacity = "1";
        labelOptionCards16.style.opacity = "1";
        optionCards12.disabled = false;
        optionCards16.disabled = false;
        labelOptionCards20.style.opacity = "0.5";
        labelOptionCards24.style.opacity = "0.5";
        optionCards20.disabled = true;
        optionCards24.disabled = true;
        optionCards20.checked = false;
        optionCards24.checked = false;

    } else if (levelAndThemeChecked >= 6 &&  optionThemeChecked >= 2 && optionLevelChecked >= 2) {
        labelOptionCards12.style.opacity = "1";
        labelOptionCards16.style.opacity = "1";
        labelOptionCards20.style.opacity = "1";
        labelOptionCards24.style.opacity = "1";
        optionCards12.disabled = false;
        optionCards16.disabled = false;
        optionCards20.disabled = false;
        optionCards24.disabled = false;

    } else if (optionThemeChecked == 1 || optionLevelChecked == 1) {
        labelOptionCards12.style.opacity = "0.5";
        labelOptionCards16.style.opacity = "0.5";
        labelOptionCards20.style.opacity = "0.5";
        labelOptionCards24.style.opacity = "0.5";
        optionCards12.disabled = true;
        optionCards16.disabled = true;
        optionCards20.disabled = true;
        optionCards24.disabled = true;
        for (let i = 0; i < optionMemoryCards.length; i++) {
            optionMemoryCards[i].checked = false;
        };

    } else if (levelAndThemeChecked <= 5) {
        labelOptionCards20.style.opacity = "0.5";
        labelOptionCards24.style.opacity = "0.5";
        optionCards20.disabled = true;
        optionCards24.disabled = true;
        for (let i = 0; i < optionMemoryCards.length; i++) {
            optionMemoryCards[i].checked = false;
        };

        if (optionLevelChecked < 3 || optionThemeChecked < 3) {
            labelOptionCards12.style.opacity = "0.5";
            labelOptionCards16.style.opacity = "0.5";
            optionCards12.disabled = true;
            optionCards16.disabled = true;
            for (let i = 0; i < optionMemoryCards.length; i++) {
                optionMemoryCards[i].checked = false;
            };
        };
    };
};


// GRAMMATICAL CLASS DISPLAY IMPLICATIONS
for (let i = 0; i < optionGrammar.length; i++) {
    optionGrammar[i].onclick = showAndHideGrammarOptions;
};

function showAndHideGrammarOptions() {
    let optionAdjective = document.getElementById('option_adjective');
    let optionAdvreb = document.getElementById('option_adverb');
    let optionNoun = document.getElementById('option_noun');
    let optionVerb = document.getElementById('option_verb');
    const nounThemes = document.getElementById('noun_themes');

    if (optionNoun.checked) {
        nounThemes.style.display = "flex";

    } else if (optionAdjective.checked == true || optionAdvreb.checked == true || optionVerb.checked == true) {
        nounThemes.style.display = "none";
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
