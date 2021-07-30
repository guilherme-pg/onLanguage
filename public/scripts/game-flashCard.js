
const cardsContainers = document.querySelectorAll('.cards_container');
const buttonPrevious = document.getElementById('previous_button');
const buttonNext = document.getElementById('next_button');
const feedback = document.getElementsByClassName('feedback')[0];
const buttonSelected = document.getElementById('button_selected');
const counter = document.getElementById('cards_counter');
const selected = document.getElementsByClassName('input_select');
const inputCard = document.getElementsByClassName('checks')
let contentArray = [];
let restarted = false;
let questNumber = 0;
let totalCounter = cardsContainers.length;


// Initial display
startSettings();
function startSettings() {
    contentArray = [];
    questNumber = 0;

    for (let i = 0; i < cardsContainers.length; i++) {
        cardsContainers[i].classList.remove('showElement');
        selected[i].checked = false;
        inputCard[i].checked = false;
    };
    cardsContainers[questNumber].classList.add('showElement');

    cardsCounter();
};







// shuffle function
function shuffleArray(arrays) {
	let array = JSON.parse(JSON.stringify(arrays));
	
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
	};
	return array;
};




// counter the card number and the cards total
function cardsCounter() {
    counter.textContent = `${questNumber + 1}/${totalCounter}`;
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

        // hide the current card and show the NEXT CARD 
    if (questNumber <= cardsContainers.length) {

        cardsContainers[questNumber].classList.remove('showElement');
        document.getElementById(`flip_card_${questNumber}`).checked = false;

        // show feedback with the reload selected out
        if (restarted == true && contentArray.length != 0 && questNumber > contentArray.length) {
            feedback.classList.add('showElement');

            // continue showing elements
        } else {
            questNumber++;
            cardsContainers[questNumber].classList.add('showElement');
        };
        
        // WORKAROUND: show feedback even if there are others options hidden
    } else {
        feedback.classList.add('showElement');
    };

    cardsCounter();
};
buttonNext.onclick = nextButton;






// RESTART: with selected cards
function restartWithSelectedCards() {
    restarted = true;
    contentArray = [];

    // check selected options
    for (let i = 0; i < selected.length; i++) {
        if (selected[i].checked) {
            contentArray.push({
                article1: document.getElementById(`article1_${i}`).textContent,
                word1: document.getElementById(`word1_${i}`).textContent,
                gender1: document.getElementById(`gender1_${i}`).textContent,
                article2: document.getElementById(`article2_${i}`).textContent,
                word2: document.getElementById(`word2_${i}`).textContent,
                gender2: document.getElementById(`gender2_${i}`).textContent
            });
        };
    };
    

    totalCounter = contentArray.length;
    contentArray = shuffleArray(contentArray)

    for (let i = 0; i < cardsContainers.length; i++) {

        if (i < contentArray.length) {
            // set new words
            document.getElementById(`article1_${i}`).textContent = contentArray[i].article1;
            document.getElementById(`word1_${i}`).textContent = contentArray[i].word1;
            document.getElementById(`gender1_${i}`).textContent = contentArray[i].gender1;

            document.getElementById(`article2_${i}`).textContent = contentArray[i].article2;
            document.getElementById(`word2_${i}`).textContent = contentArray[i].word2;
            document.getElementById(`gender2_${i}`).textContent = contentArray[i].gender2;


            // remove gender class
            document.getElementById(`article1_${i}`).removeAttribute('class');
            document.getElementById(`word1_${i}`).removeAttribute('class');
            document.getElementById(`article2_${i}`).removeAttribute('class');
            document.getElementById(`word2_${i}`).removeAttribute('class');


            // set new gender class
            document.getElementById(`article1_${i}`).classList.add(contentArray[i].gender1);
            document.getElementById(`word1_${i}`).classList.add(`${contentArray[i].gender1}`);
            document.getElementById(`article2_${i}`).classList.add(`${contentArray[i].gender2}`);
            document.getElementById(`word2_${i}`).classList.add(`${contentArray[i].gender2}`);
        };
    };

    startSettings();
};
buttonSelected.onclick = restartWithSelectedCards;