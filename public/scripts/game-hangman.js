// REQUIRE: SEND ALL DATA AT ONCE TO PREVENT RELOAD THE PAGE
// REQUIRE: IMPLEMENT THE HANGMAN FIGURE
// REQUIRE: IMPLEMENT NEXT BUTTON
// REQUIRE:  SET LIMIT OF ANSWERS



// GLOBAL VARIABLES
let arrayOfLetterOfTheHiddenWord = [];
let replacementLetter = '';
let letterOfTheHiddenWord = '';



// HIDE THE WORD
const hiddenWord = document.getElementsByClassName('letter_space');
for (let i = 0; i < hiddenWord.length; i++) {
    hiddenWord[i].style.display = "none";
};



// CREATE ALPHABET BUTTONS
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z', 'ß', 'ç', 'œ'];
let buttonsSpace = document.getElementById('buttons_space');

for (let i = 0; i < alphabet.length; i++) {
    let createDiv = document.createElement('div');
    let createInput = document.createElement("input");
    let createLabel = document.createElement("label");

    createDiv.className = "div_alphabet_buttons";

    createInput.value = alphabet[i];
    createInput.type = 'checkbox';
    createInput.className = "inputs_alphabet"; 
    createInput.id = `buttons_alphabet_${i}`; 

    createLabel.className = 'labels_alphabet';
    createLabel.setAttribute('for', `buttons_alphabet_${i}`);
    createLabel.textContent = alphabet[i];

    let divForInputsLabels = document.getElementsByClassName('div_alphabet_buttons');

    buttonsSpace.appendChild(createDiv);
    divForInputsLabels[i].appendChild(createInput);
    divForInputsLabels[i].appendChild(createLabel);

    buttonsAlphabet = document.getElementsByClassName('inputs_alphabet');
    buttonsAlphabet[i].onclick = checkLetter;
};



for (let i = 0; i < hiddenWord.length; i++) {
    replacementLetter = hiddenWord[i].textContent;
    letterOfTheHiddenWord = hiddenWord[i].textContent;
    checkAccents(letterOfTheHiddenWord);
    arrayOfLetterOfTheHiddenWord.push(letterOfTheHiddenWord);
};



// PREVENT ACCENTS
function checkAccents() {
    if (letterOfTheHiddenWord == 'à' || letterOfTheHiddenWord == 'á' || letterOfTheHiddenWord == 'ã' || letterOfTheHiddenWord == 'ä' || letterOfTheHiddenWord == 'â') {
        replacementLetter = "a";

    } else if (letterOfTheHiddenWord == 'è' || letterOfTheHiddenWord == 'é' || letterOfTheHiddenWord == 'ê' || letterOfTheHiddenWord == 'ë') {
        replacementLetter = 'e';

    } else if (letterOfTheHiddenWord == 'ì' || letterOfTheHiddenWord == 'í' || letterOfTheHiddenWord == 'ï' || letterOfTheHiddenWord == 'î') {
        replacementLetter = 'i';

    } else if (letterOfTheHiddenWord == 'ò' || letterOfTheHiddenWord == 'ó' || letterOfTheHiddenWord == 'ö' || letterOfTheHiddenWord == 'ô') {
        replacementLetter = 'o';

    } else if (letterOfTheHiddenWord == 'ù' || letterOfTheHiddenWord == 'ú' || letterOfTheHiddenWord == 'ü' || letterOfTheHiddenWord == 'û') {
        replacementLetter = 'u';

    } else if (letterOfTheHiddenWord == 'ñ') {
        replacementLetter = 'n';
    };
    letterOfTheHiddenWord = replacementLetter.toLowerCase();
};



// CLICK ALPHABET BUTTON TO CHECK
function checkLetter(event) {
    const letterSpace = document.getElementsByClassName('letter_space');
    const letterCase = document.getElementsByClassName('letter_case');
    let alphabetLabelButton = document.getElementsByClassName('labels_alphabet');
    let arrayOfLettersChecked = [];
    let letterChecked = '';
    let errorCount = 0;
    let correctCount = 0;

    for (let i = 0; i < buttonsAlphabet.length; i++) {

        // DETECT WHAT BUTTON WAS CHECKED
        if (buttonsAlphabet[i].checked == true && buttonsAlphabet[i].disabled == false && arrayOfLettersChecked.includes(buttonsAlphabet[i].value) == false) {

            // CORRECT CHECK: IF THE BUTTON VALUE ITS INCLUDED IN THE HIDDEN WORD
            if (arrayOfLetterOfTheHiddenWord.includes(buttonsAlphabet[i].value)) {

                buttonsAlphabet[i].disabled = true;
                alphabetLabelButton[i].style.backgroundColor = "rgb(45, 185, 45)";
                arrayOfLettersChecked.push(buttonsAlphabet[i].value);
                letterChecked = buttonsAlphabet[i].value;

                // SET DISPLAY NONE WORD TO FLEX
                for (let i = 0; i < hiddenWord.length; i++) {

                    // PREVENT ACCENTS
                    replacementLetter = hiddenWord[i].textContent;
                    letterOfTheHiddenWord = hiddenWord[i].textContent
                    checkAccents(letterOfTheHiddenWord);

                    // SET THE CORRECT LETTER
                    if (letterOfTheHiddenWord == letterChecked) {
                        hiddenWord[i].style.display = "flex";
                        hiddenWord[i].style.backgroundColor = "rgb(128, 223, 136)";  //color from the answer
                        correctCount++
                    };
                    if (hiddenWord.length == correctCount) {
                        for (let i = 0; i < hiddenWord.length; i++) {
                            hiddenWord[i].style.backgroundColor = "rgb(61, 216, 69)";  //color from the answer
                        };
                        for (let i = 0; i < buttonsAlphabet.length; i++) {
                            buttonsAlphabet[i].disabled = true;
                        };
                    };
                };


            // CHECKED THE WRONG LETTER: DISABLE BUTTON AND SET IT RED
            } else if (arrayOfLetterOfTheHiddenWord.includes(buttonsAlphabet[i].value) == false) {

                buttonsAlphabet[i].disabled = true;
                alphabetLabelButton[i].style.backgroundColor = "rgb(230, 63, 63)";
                arrayOfLettersChecked.push(buttonsAlphabet[i].value);
                errorCount++

                // LIMIT THE POSSIBILITIES
                if (errorCount == 6) {
                    for (let i = 0; i < buttonsAlphabet.length; i++) {
                        buttonsAlphabet[i].disabled = true;
                    };
                    for (let i = 0; i < hiddenWord.length; i++) {
                        if (hiddenWord[i].style.display == "none") {
                            letterCase[i].style.backgroundColor = "rgb(230, 63, 63)";
                            hiddenWord[i].style.display = "flex";
                        } else {
                            letterSpace[i].style.backgroundColor = "rgb(250, 96, 96)";
                        };
                    };
                };
            };
        };
    };
};

// REQUIRE: DIFFICULT MODE: EASY(10 CHANCES); NORMAL(10 CHANCES): LIMIT THE POSSIBILITIES ??
