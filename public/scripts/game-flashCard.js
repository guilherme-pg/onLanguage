
const cardsContainers = document.querySelectorAll('.cards_container');
const buttonPrevious = document.getElementById('previous_button');
const buttonNext = document.getElementById('next_button');
const feedback = document.getElementsByClassName('feedback')[0];
const buttonSelected = document.getElementById('button_selected');
const counter = document.getElementById('cards_counter');
const selected = document.getElementsByClassName('input_select');
let questNumber = 0;

// Initial display
if (questNumber == 0) {
    cardsContainers[questNumber].classList.add('showElement');
    cardsCounter();
};






// counter the card number and the cards total
function cardsCounter() {
    counter.textContent = `${questNumber + 1}/${cardsContainers.length}`;
};


// SIDE BUTTONS: hide and show: previous and next elements
function previousButton() {
    if (questNumber > 0) {
        cardsContainers[questNumber].classList.remove('showElement');
        document.getElementById(`flip_card_${questNumber}`).checked = false;
        questNumber--;
        cardsContainers[questNumber].classList.add('showElement');
    };
    cardsCounter();
};
buttonPrevious.onclick = previousButton;

// SIDE BUTTONS: hide and show: previous and next elements
function nextButton() {
    
    if (questNumber <= cardsContainers.length) {
        cardsContainers[questNumber].classList.remove('showElement');
        document.getElementById(`flip_card_${questNumber}`).checked = false;
        questNumber++;

        cardsContainers[questNumber].classList.add('showElement');

    } else {
        feedback.classList.add('showElement');
    };
    cardsCounter();
};
buttonNext.onclick = nextButton;






// RESTART: with selected cards
function restartWithSelectedCards() {
    for (let i = 0; i < selected.length; i++) {
        if (selected[i].checked) {
            document.getElementById(`gender1_${i}`);
            document.getElementById(`article1_${i}`);
            document.getElementById(`word1_${i}`);

            document.getElementById(`gender2_${i}`);
            document.getElementById(`article2_${i}`);
            document.getElementById(`word2_${i}`);
        };
    };
};
buttonSelected.onclick = restartWithSelectedCards;