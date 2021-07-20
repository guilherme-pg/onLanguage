const containerChallenger = document.querySelectorAll('.container_challenger');
const buttonNext = document.getElementById('button_next');
let questNumber = 0;

// INITIAL DISPLAY CONFIGURATIONS
containerChallenger[0].classList.add('showElement');



function endingFeedback() {
    console.log('FEEDBACK !!');
};

// Next quest
function nextQuest() {
    containerChallenger[questNumber].classList.remove('showElement');
    questNumber++

    if (questNumber >= containerChallenger.length) {
        endingFeedback();

    } else {
        containerChallenger[questNumber].classList.add('showElement');
    };
};
buttonNext.onclick = nextQuest;