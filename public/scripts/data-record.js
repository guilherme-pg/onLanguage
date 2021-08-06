const optionGrammar = document.getElementsByName('option_grammar');
const optionGrammarVerb = document.getElementById('option_verb');
const nounThemes = document.getElementById('noun_themes');
const optionLanguage = document.getElementsByName('option_language');
const optionSecondLanguage = document.getElementsByName('option2_language');
const secondLanguageToHide = document.getElementsByClassName('label_option2_language');
const firstLanguageToHide = document.getElementsByClassName('label_option_language');


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
