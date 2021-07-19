const optionGrammar = document.getElementsByName('option_grammar');
const optionGrammarVerb = document.getElementById('option_verb');
const nounThemes = document.getElementById('noun_themes');



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