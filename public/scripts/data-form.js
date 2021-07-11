
const grammarOption = document.getElementById('input_grammar');
const themesContainer = document.getElementsByClassName('themes_container');
const articleInput = document.getElementsByClassName('article_input');
const genderInput = document.getElementsByClassName(' gender_input');


// WORKAROUND
grammarOption.addEventListener('change', event => {
    
    let checkedOption = [...event.target.children].find(c => c.selected);
    
    if (checkedOption.value == 'noun') {
        for (let i = 0; i < themesContainer.length; i++) {
            themesContainer[i].style.display = 'flex';
        };
        for (let i = 0; i < articleInput.length; i++) {
            articleInput[i].style.display = 'flex';
        };
        for (let i = 0; i < genderInput.length; i++) {
            genderInput[i].style.display = 'flex';
        };

    } else {
        for (let i = 0; i < themesContainer.length; i++) {
            themesContainer[i].style.display = 'none';
        };
        for (let i = 0; i < articleInput.length; i++) {
            articleInput[i].style.display = 'none';
        };
        for (let i = 0; i < genderInput.length; i++) {
            genderInput[i].style.display = 'none';
        };

    };
});
