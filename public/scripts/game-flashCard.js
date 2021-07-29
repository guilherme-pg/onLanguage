
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
    let contentArray = [];

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
    
    console.log('CCCCCCCC contentArray[0]  ===>>>>   ', contentArray[0])
    console.log('CCCCCCCC contentArray[0]  ===>>>>   ', contentArray[1])
    console.log('CCCCCCCC contentArray[0]  ===>>>>   ', contentArray[2])
    console.log('CCCCCCCC contentArray[0]  ===>>>>   ', contentArray[3])

    // RESET content
    // reset values
    // reset class gender
    // add new values
    // add correspondent gender class
    contentArray = shuffleArray(contentArray)

    for (let i = 0; i < cardsContainers.length; i++) {

        if (i < selected.length) {
            document.getElementById(`article1_${i}`).textContent = contentArray[i].article1;
            document.getElementById(`word1_${i}`).textContent = contentArray[i].word1;
            document.getElementById(`gender1_${i}`).textContent = contentArray[i].gender1;
            document.getElementById(`article2_${i}`).textContent = contentArray[i].article2;
            document.getElementById(`word2_${i}`).textContent = contentArray[i].word2;
            document.getElementById(`gender2_${i}`).textContent = contentArray[i].gender2;

            document.getElementById(`article1_${i}`).removeAttribute('class');
            document.getElementById(`word1_${i}`).removeAttribute('class');
            document.getElementById(`article2_${i}`).removeAttribute('class');
            document.getElementById(`word2_${i}`).removeAttribute('class');

            console.log('AAAAA  contentArray[i].gender1  ===>>>  ', contentArray[i].gender1)
            console.log('BBBBB TYPE  contentArray[i].gender1  ===>>>  ', typeof contentArray[i].gender1)
            
            // Uncaught DOMException: An invalid or illegal string was specified
            // document.getElementById(`article1_${i}`).classList.add(contentArray[i].gender1);
            // document.getElementById(`word1_${i}`).classList.add(`${contentArray[i].gender1}`);
            document.getElementById(`article2_${i}`).classList.add(`${contentArray[i].gender2}`);
            document.getElementById(`word2_${i}`).classList.add(`${contentArray[i].gender2}`);
        };
    };
};
buttonSelected.onclick = restartWithSelectedCards;