const containerChallenger = document.querySelectorAll('.container_challenger');
const buttonNext = document.getElementById('button_next');
const buttonResolve = document.getElementById('button_resolve');
let questNumber = 0;
let userCorrectAnswers = 0;
let skippedQuest = 0;

// INITIAL DISPLAY CONFIGURATIONS
containerChallenger[0].classList.add('showElement');



// QUEST COUNTER
let numberOfQuests = containerChallenger.length;
for (let i = 0; i < numberOfQuests; i++) {
    document.getElementById(`quest_counter_number_${i}`).innerText = `${i+1}/${numberOfQuests}`;
};



// CHECK user response
function checkUserAnswer() {
    let userAnswer = document.getElementById(`input_word_${questNumber}`);
    let correctAnswer = document.getElementById(`word_checkable_${questNumber}`);
    
    // check user answer
    if (userAnswer.value == correctAnswer.textContent) {
        userAnswer.disabled = true;
        userCorrectAnswers++
        userAnswer.classList.add('correct_answer');

    // wrong or skipped answer
    } else {
        userAnswer.disabled = true;
        correctAnswer.classList.add('showElement');
        userAnswer.classList.add('wrong_answer');

        // skipped quest
        if (userAnswer.value == '') {
            skippedQuest++
        }
    };
};
buttonResolve.onclick = checkUserAnswer;






function endingFeedback() {
    console.log('FEEDBACK !!');
};

// Next quest
function nextQuest() {
    checkUserAnswer();

    containerChallenger[questNumber].classList.remove('showElement');
    questNumber++;

    if (questNumber >= containerChallenger.length) {
        endingFeedback();

    } else {
        containerChallenger[questNumber].classList.add('showElement');
    };
};
buttonNext.onclick = nextQuest;