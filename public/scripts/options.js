
// PREVENT NONE SELECTED
var buttonStart = document.getElementById('button_start');
buttonStart.onclick = validatioForm;

function stopDefAction(event) {
    event.preventDefault();
};

function validatioForm(event) {
    let validateLanguageSelected = false;
    let validateGrammarSelected = false;
    let validateLevelSelected = false;
    let validateThemeSelected = false;
    let validateSecondaryLanguageSelected = false;


    // VALIDATION: IF GAME SELECTED
    let optionGame = document.getElementsByName('option_game');
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
    let optionLanguage = document.getElementsByName('option_language');
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
    let optionGrammar = document.getElementsByName('option_grammar');
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
    let optionLevel = document.getElementsByName('option_level');
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
    let optionTheme = document.getElementsByName('option_theme');
    for (let i = 0; i < optionTheme.length; i++) {
        if (optionTheme[i].checked) {
            validateThemeSelected = true;
        };
    };
    if (!validateThemeSelected) {
        stopDefAction(event);
        alert("Need to choose at least one Theme option!");
    };


    // REQUIRE: PREVENT AFTER IMPLEMENT HOVER LANGUAGE METHOD AND LINK GAME
    // var optionLanguageMethod = document.getElementsByName('option_language_method');
    // for (i = 0; i < optionLanguageMethod.length; i++) {
    //     if (optionTheme.includes(optionTheme[i].checked) == false) {
    //         alert("Need to choose at least one Theme option!");
    //     };
    // };


    // VALIDATION: IF SECONDARY LANGUAGE SELECTED 
    let optionDual = document.getElementById('option_dual');
    if (optionDual.checked) {
        let option2Language = document.getElementsByName('option2_language');
        for (let i = 0; i < option2Language.length; i++) {
            
            if (option2Language[i].checked) {
                validateSecondaryLanguageSelected = true;
            };
        };
        if (!validateSecondaryLanguageSelected) {
            stopDefAction(event);
            alert("Need to choose a Second Language option!");
        };
    };
};





// OPTIONS DISPLAY
let methodLanguage = document.getElementsByName('option_language_method');
for (let i = 0; i < methodLanguage.length; i++) {
    // UNFLIPED, FLIPED AND MATCHED
    methodLanguage[i].onclick = secondLanguageDisplay;
    // methodLanguage[i].addEventListener("click", secondLanguageDisplay);
};


function secondLanguageDisplay(event) {

    // REQUIRE: CHANGE THE DISPLAY PROPERTY TO ANOTHER THING OTHER THAN 'NONE'
    if (methodLanguage[0].checked) {
        document.getElementById('second_language').style.display = "none";
    } else if (methodLanguage[1].checked == true || methodLanguage[2].checked == true) {
        document.getElementById('second_language').style.display = "flex";
    };
};






// PREVENT MEMORY CARDS NUMBERS FOR EACH DIFICULT AND/OR THEME SELECTED

// REQUIRE: prevent to show only when memory is selected
// REQUIRE: prevent to to show number of options only if each theme/dificult is selected
// REQUIRE: uptade routes and DAO for number of memory cards selected
// REQUIRE:  ADD CONDITIONS TO OPTIONS


// DISPLAY CONFIGURATIONS
var optionGame = document.getElementsByName('option_game');
for (let i = 0; i < optionGame.length; i++) {
    optionGame[i].onclick = showAndHideOptions;
};

document.getElementById('memory_cards_options').style.display = "none";
document.getElementById('second_language').style.display = "none";
document.getElementById('method_language').style.display = "none";



var optionMemoryCards = document.getElementsByName('option_cards');





function showAndHideOptions(event) {
    let optionHangman = document.getElementById('option_hangman');
    let optionFormWords = document.getElementById('option_form_words');
    let optionMemory = document.getElementById('option_memory');
    let optionMultipleChoice = document.getElementById('option_multipleChoice');
    let optionSecondLanguage = document.getElementsByName('option2_language');
    let titleSecondLanguage = document.getElementById('title_second_language');


    // REQUIRE: CHANGE THE DISPLAY PROPERTY TO ANOTHER THING OTHER THAN 'NONE'7
    // HIDE AND SHOW SECOND LANGUAGE AND METHOD
    if (optionMemory.checked) {
        document.getElementById('memory_cards_options').style.display = "flex";
        document.getElementById('second_language').style.display = "flex";
        document.getElementById('method_language').style.display = "flex";
        titleSecondLanguage.innerText = "Second Language";

    } else if (optionHangman.checked == true || optionFormWords.checked == true) {
        document.getElementById('second_language').style.display = "none";
        document.getElementById('method_language').style.display = "none";
        document.getElementById('memory_cards_options').style.display = "none";
        
        for (let i = 0; i < optionMemoryCards.length; i++) {optionMemoryCards[i].checked = false};
        for (let i = 0; i < methodLanguage.length; i++) {methodLanguage[i].checked = false};
        for (let i = 0; i < optionSecondLanguage.length; i++) {optionSecondLanguage[i].checked = false;};

    } else if (optionMultipleChoice.checked) {
        document.getElementById('method_language').style.display = "none";
        document.getElementById('memory_cards_options').style.display = "none";
        document.getElementById('second_language').style.display = "flex";

        for (let i = 0; i < optionMemoryCards.length; i++) {optionMemoryCards[i].checked = false};
        for (let i = 0; i < methodLanguage.length; i++) {methodLanguage[i].checked = false};
        titleSecondLanguage.innerText = "Answers Language";
    };
};


// REQUIRE: SIMPLIFICATION
// PREVENT THE NUMBER OF CARDS CHOOSED OF THE MEMORY GAME EXCEED THE NUMBER OF POSSIBILITIES
function numberOfMemoryCards() {

    // NUMBER OF MEMORY CARDS
    let labelOptionCards12 = document.getElementById('label_option_cards_12');
    let labelOptionCards16 = document.getElementById('label_option_cards_16');
    let labelOptionCards20 = document.getElementById('label_option_cards_20');
    let labelOptionCards24 = document.getElementById('label_option_cards_24');
    labelOptionCards12.style.opacity = "0.5";
    labelOptionCards16.style.opacity = "0.5";
    labelOptionCards20.style.opacity = "0.5";
    labelOptionCards24.style.opacity = "0.5";

    // DISABLE THE NUMBERS
    let optionCards12 = document.getElementById('option_cards_12');
    let optionCards16 = document.getElementById('option_cards_16');
    let optionCards20 = document.getElementById('option_cards_20');
    let optionCards24 = document.getElementById('option_cards_24');
    optionCards12.disabled = true;
    optionCards16.disabled = true;
    optionCards20.disabled = true;
    optionCards24.disabled = true;

    // DEPENDENCE FROM THE NUMBER OF LEVELS AND THEMES SELECTED
    let optionLevel = document.getElementsByName('option_level');
    let optionTheme = document.getElementsByName('option_theme');
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
var optionGrammar = document.getElementsByName('option_grammar');
for (let i = 0; i < optionGrammar.length; i++) {
    optionGrammar[i].onclick = showAndHideGrammarOptions;
};


function showAndHideGrammarOptions() {
    let optionAdjective = document.getElementById('option_adjective');
    let optionAdvreb = document.getElementById('option_adverb');
    let optionNoun = document.getElementById('option_noun');
    let optionVerb = document.getElementById('option_verb');

    if (optionNoun.checked) {
        document.getElementById('noun_themes').style.display = "flex";

    } else if (optionAdjective.checked == true || optionAdvreb.checked == true || optionVerb.checked == true) {
        document.getElementById('noun_themes').style.display = "none";
    }
};


// var numberOfOptionLevelChecked = 0;
// var optionLevel = document.getElementsByName('option_level');
// var optionMemoryCards = document.getElementsByName('option_cards');
// for (i = 0; i < optionLevel.length; i++) {
//     console.log('BBBBB optionLevel[i] BBBBB   ====   ', i, optionLevel[i].checked);

//     if (optionLevel[i].checked == true) {
//         numberOfOptionLevelChecked++
//         console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA');

//         if (numberOfOptionLevelChecked == 1) {
//             document.getElementById('option_cards_8').checked;

//             for (k = 0; k < optionMemoryCards.length; k++) {
//                 optionMemoryCards[i].disabled == true;
//             };

//         } else if (numberOfOptionLevelChecked == 2) {
//             document.getElementById('option_cards_12').disabled == false;
//             document.getElementById('option_cards_16').disabled == false;

//             // for (k = 0; k < optionMemoryCards.length; k++) {
//             //     optionMemoryCards[i].disabled == false;
//             // };
//             // document.getElementById('option_cards_20').disabled == true;
//             // document.getElementById('option_cards_24').disabled == true;
        
//         } else if (numberOfOptionLevelChecked >= 3) {
//             document.getElementById('option_cards_20').disabled == true;
//             document.getElementById('option_cards_24').disabled == true;
//         };
//     };
// };