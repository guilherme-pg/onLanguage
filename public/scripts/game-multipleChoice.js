// GLOBAL VARIABLES

const buttonNext = document.getElementById('button_next');
const buttonPrevious = document.getElementById('button_previous');
const containerHiddenArray = document.getElementsByClassName('containerHidden');

let previousNumber = -1;
let nextNumber = 0;
let wrongWords = [];
let correctWords = [];
let counter = 0;


// START CONTAINER NOT HIDDEN
document.getElementById('containerHidden_0').classList.remove('hiddenElement');


// QUEST COUNTER
let numberOfQuests = containerHiddenArray.length;
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
        document.getElementsByClassName('container_feedback')[0].classList.add('showElement');
        document.getElementsByClassName('buttons_container')[0].classList.add('hiddenElement');
        document.getElementsByClassName('partsofmain_multiple_choice')[0].classList.add('hiddenElement');


        // COUNTER OF CORRECTS OUT OF TOTAL
        document.getElementById('container_feedback_numbers').textContent = `You got ${correctWords.length} out of ${containerHiddenArray.length}`;

        // SHOW NUMBER OF NOT MARKED QUESTS IF THERE IS AT LEAST 1 NOT MARKED
        let answered = correctWords.length + wrongWords.length;
        let notMarked = document.getElementById('container_feedback_not_marked');

        if (containerHiddenArray.length == answered + 1) {
            notMarked.style.display = 'flex';
            notMarked.textContent = "1 question was not answered";

        } else if (containerHiddenArray.length > answered + 1) {
            notMarked.style.display = 'flex';
            notMarked.textContent = `${containerHiddenArray.length - answered} questions were not answered`;
        };


        // ADDING DYNAMICALLY ELEMENTS TO SHOW THE RIGHT, WRONGS AND CORRECTIONS
        for (let i = 0; i < correctWords.length; i++) {
            let pElementCorrect = document.createElement('p');
            let correctWord = document.createTextNode(`${correctWords[i]}`);
            pElementCorrect.appendChild(correctWord);
            const correctWordsFeedback = document.getElementById('correct_answers');
            correctWordsFeedback.appendChild(pElementCorrect);
        };

        for (let i = 0; i < wrongWords.length; i++) {
            let pElementWrong = document.createElement('p');
            let wrongWord = document.createTextNode(`${wrongWords[i]}`);
            pElementWrong.appendChild(wrongWord);
            const wrongWordsFeedback = document.getElementById('wrong_answers');
            wrongWordsFeedback.appendChild(pElementWrong);
        };
        // REQUIRE: SHOW WHAT EACH WRONG ANSWER SHOULD BE
        // REQUIRE: IF A QUEST WAS NOT MARKED SHOW THE NUMBER OF QUESTS NOT MARKED
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
            let referenceWord = document.getElementById(`reference_question_${counter}`).textContent;

            // CHECK ANSWER AND CHANGE COLORS
            // IF CORRECT
            if (answersGroup[j].value == correctAnswer.textContent) {
                answersGroup[j].classList.add("correct_choice"); //IF CORRECT CHANGE TO GREEN
                correctWords.push(referenceWord);
    
            // IF WRONG
            } else {
                answersGroup[j].classList.add("wrong_choice"); //IF WRONG CHANGE TO RED
                wrongWords.push(referenceWord);

                // IF WRONG SHOW THE CORRECT AND THE OTHERS WRONGS
                for (let h = 0; h < answersGroup.length; h++) {
                    
                    if (answersGroup[h].value == correctAnswer.textContent) {
                        answersGroup[h].classList.add("correct_choice"); //SHOW THE CORRECT

                    } else if (answersGroup[h].value != correctAnswer.textContent && answersGroup[h].value != answersGroup[j].value) {
                        answersGroup[h].classList.add("not_chosen"); //SHOW THE ANSWERS WRONGS NOT CHOOSED
                    };
                };
            };
        });
    };
};





// BUTTON: MARKED AND UNMARKED
let listMarked = [];
buttonMarkedUnmarked = document.getElementById('button_mark');
function markedUnmarked() {

    if (listMarked.includes(counter)) {
        let indexArray = listMarked.indexOf(counter);
        if (indexArray > -1 ) {
            listMarked.splice(indexArray, 1);
        };
        // listMarked.remove(counter);
        document.getElementById(`button_mark`).classList.remove('button_marked');
        document.getElementById(`button_mark`).setAttribute("value", "Unmarked");

    } else {
        listMarked.push(counter);
        document.getElementById(`button_mark`).classList.add('button_marked');
        document.getElementById(`button_mark`).setAttribute("value", "Marked");
    };
    

    // associate counter number to button activision (marked)
};
buttonMarkedUnmarked.onclick = markedUnmarked;


// change button marked/unmarked
function changeMarkedUnmarked() {

    if (listMarked.includes(counter)) {
        document.getElementById(`button_mark`).classList.add('button_marked');
        document.getElementById(`button_mark`).setAttribute("value", "Marked");

    } else {
        document.getElementById(`button_mark`).classList.remove('button_marked');
        document.getElementById(`button_mark`).setAttribute("value", "Unmarked");
    };
};




// BUTTON: NEXT: SHOW NEXT, HIDDE PREVIOUS
function nextQuest() {

    if (nextNumber > containerHiddenArray.length) {
        {};
    } else {
        if (previousNumber >= 0) {
            // to prevent the starting game configuration
            document.getElementById(`containerHidden_${previousNumber}`).classList.add('hiddenElement');
        };
        previousNumber++;
        nextNumber++;
        document.getElementById(`containerHidden_${previousNumber}`).classList.add('hiddenElement');
        document.getElementById(`containerHidden_${nextNumber}`).classList.remove('hiddenElement');
    };

    counter++;
    changeMarkedUnmarked()

    endingFeedback();
};
buttonNext.onclick = nextQuest;



// BUTTON: PREVIOUS: SHOW previous, HIDDE next
function previousQuest() {

    // prevent regression without regression possibility
    if (previousNumber <= -1) {
        {};
    } else {
        document.getElementById(`containerHidden_${previousNumber}`).classList.remove('hiddenElement');
    };
    
    // prevent the nextnumber -1
    if (nextNumber <= 0) {
        {};
    } else {
        document.getElementById(`containerHidden_${nextNumber}`).classList.add('hiddenElement');
        previousNumber--;
        nextNumber--;
    };
    
    counter--
    changeMarkedUnmarked()
};
buttonPrevious.onclick = previousQuest;


// POSSIBILITY: SHOW RESULTS (TABLE WITH WORDS WRONG AND RIGHT WITH NUMBER OF CORRECTS AND INCORRECTS)
// POSSIBILITY: SHOW PERCENTAGES INSTEAD OF THE NUMBER OF CORRECT ANSWERS
// REQUIRE: set only one button (next - previous) function