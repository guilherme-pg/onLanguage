// GLOBAL VARIABLES
let previousNumber = -1;
let nextNumber = 0;
let buttonNext = document.getElementById('button_next');
let buttonPrevious = document.getElementById('button_previous');
let containerHiddenArray = document.getElementsByClassName('containerHidden');
let wrongWords = [];
let correctWords = [];
let counter = 0;


// START CONTAINER NOT HIDDEN
document.getElementById('containerHidden_0').style.display = "flex";


// QUEST COUNTER
let numberOfQuests = document.getElementsByClassName('containerHidden').length;
for (let i = 0; i < numberOfQuests; i++) {
    document.getElementById(`quest_counter_number_${i}`).innerText = `${i+1}/${numberOfQuests}`;
};



// BUTTON: PREVIOUS: HIDDE NEXT, SHOW PREVIOUS
// function previousQuest() {
//     document.getElementById(`containerHidden_${nextNumber}`).hidden = true;
//     if (previousNumber == -1) {
//         console.log('previousNumber == -1');
//     } else {
//         previousNumber--;
//         nextNumber--;
//     };
//     document.getElementById(`containerHidden_${previousNumber}`).removeAttribute("hidden");
// };
// buttonPrevious.onclick = previousQuest;



// FEEDBACK RESPONSE
function endingFeedback() {

    // CHANGE DISPLAY OF THE NEXTBUTTON, THE QUEST AND SHOW THE RESULTS
    if (counter == containerHiddenArray.length) {
        document.getElementById('container_feedback').style.display = 'flex';
        document.getElementById('container_side_buttons').style.display = 'none';
        document.getElementById('partsofmain_multiple_choice').style.display = 'none';
    };

    // COUNTER OF CORRECTS OUT OF TOTAL
    document.getElementById('container_feedback_numbers').textContent = `You got ${correctWords.length} out of ${containerHiddenArray.length}`;

    // ADDING DYNAMICALLY ELEMENTS TO SHOW THE CORRECTS ANS WRONGS WORDS
    for (let i = 0; i < correctWords.length; i++) {
        let pElementCorrect = document.createElement('p');
        let correctWord = document.createTextNode(`${correctWords[i]}`);
        pElementCorrect.appendChild(correctWord);
        let correctWordsFeedback = document.getElementById('correct_answers');
        correctWordsFeedback.appendChild(pElementCorrect);
    };

    for (let i = 0; i < wrongWords.length; i++) {
        let pElementWrong = document.createElement('p');
        let wrongWord = document.createTextNode(`${wrongWords[i]}`);
        pElementWrong.appendChild(wrongWord);
        let wrongWordsFeedback = document.getElementById('wrong_answers');
        wrongWordsFeedback.appendChild(pElementWrong);
    };
};








// CHANGE COLORS ACCORDING TO THE ANSWER
let correctAnswer = document.getElementById(`containerHidden_${previousNumber}`);

for (let i = 0; i < containerHiddenArray.length; i++) {
    let answersGroup = document.getElementsByClassName(`answers_group_${i}`);

    for (let j = 0; j < answersGroup.length; j++) {
        answersGroup[j].addEventListener('click', function() {

            // DISABLE BUTTONS AFTER CLICK
            for (let k = 0; k < answersGroup.length; k++) {
                answersGroup[k].disabled = true;
            };

            let correctAnswer = document.getElementById(`correctAnswer_${counter}`);

            // CHECK ANSWER AND CHANGE COLORS

            // IF CORRECT
            if (answersGroup[j].value == correctAnswer.textContent) {
                answersGroup[j].classList.add("correct_choice"); //IF CORRECT CHANGE TO GREEN
                correctWords.push(answersGroup[j].value);
                
            // IF WRONG
            } else {
                answersGroup[j].classList.add("wrong_choice"); //IF WRONG CHANGE TO RED
                wrongWords.push(answersGroup[j].value);

                // IF WRONG SHOW THE CORRECT AND THE OTHERS WRONGS
                for (let h = 0; h < answersGroup.length; h++) {
                    
                    if (answersGroup[h].value == correctAnswer.textContent) {
                        answersGroup[h].classList.add("correct_choice"); //SHOW THE CORRECT

                    } else if (answersGroup[h].value != correctAnswer.textContent && answersGroup[h].value != answersGroup[j].value) {
                        answersGroup[h].classList.add("not_chosen"); //SHOW THE ANSWERS WRONGS NOT CHOOSED
                    };
                };
            };
            counter++
        });
        // answersGroup[j].onclick = checkAnswer;
    };
};


// BUTTON: NEXT: SHOW NEXT, HIDDE PREVIOUS
function nextQuest() {
    if (nextNumber > containerHiddenArray.length) {
        console.log('nextNumber  >   containerHiddenArray.length');
    } else {
        previousNumber++;
        nextNumber++;
    };
    document.getElementById(`containerHidden_${previousNumber}`).style.display = "none";
    try {
        document.getElementById(`containerHidden_${nextNumber}`).style.display = "flex";
    } catch {
        console.log("O ERRO DO NEXT NUMBER")
    };

    endingFeedback();
};
buttonNext.onclick = nextQuest;


// SHOW RESULTS (TABLE WITH WORDS WRONG AND RIGHT WITH NUMBER OF CORRECTS AND INCORRECTS)





