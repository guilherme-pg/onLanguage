
const cardsContainers = document.querySelectorAll('.cards_container');
const buttonPrevious = document.getElementById('previous_button');
const buttonNext = document.getElementById('next_button');
const feedback = document.getElementsByClassName('feedback')[0];
const buttonSelected = document.getElementById('button_selected');
let questNumber = 0;

// Initial display
cardsContainers[questNumber].classList.add('showElement');






// SIDE BUTTONS: hide and show: previous and next elements
function previousButton() {
    if (questNumber > 0) {
        cardsContainers[questNumber].classList.remove('showElement');
        questNumber--;
        cardsContainers[questNumber].classList.add('showElement');
    };
};
buttonPrevious.onclick = previousButton;


function nextButton() {
    
    if (questNumber <= cardsContainers.length) {
        cardsContainers[questNumber].classList.remove('showElement');
        questNumber++;

        cardsContainers[questNumber].classList.add('showElement');

    } else {
        feedback.classList.add('showElement');
    }
};
buttonNext.onclick = nextButton;






// RESTART: with selected cards
function restartWithSelectedCards() {

};
buttonSelected.onclick = restartWithSelectedCards;