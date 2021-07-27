
const cardsContainers = document.querySelectorAll('.cards_container');
const buttonPrevious = document.getElementById('previous_button');
const buttonNext = document.getElementById('next_button');
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
    // not working
    if (ardsContainers.length >= questNumber) {
        cardsContainers[questNumber].classList.remove('showElement');
        questNumber++;
        cardsContainers[questNumber].classList.add('showElement');
    };
};
buttonNext.onclick = nextButton;