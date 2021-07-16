// REQUIRE: IMPLEMENT RESTART BUTTON WITHOUT RELOAD
// REQUIRE: CHANGE COLOR WHEN ITS CORRECT

const firstPartMain = document.querySelectorAll('.partsofmain_memory')[0];
let cardsContainers = document.querySelectorAll('.cards_container');
const buttonCardsNumber = document.querySelectorAll('.input_option')
const checks = document.querySelectorAll('.checks');
const flipCards = document.querySelectorAll('.flip_card');
const restartButton = document.getElementById('button_restart');
let checkedChecks = [];
let contadorPares = 0;
let reloadPage = false;
let numberOfCards = 12;

// CHANGE COLORS ACCORDING THE GENDERS
const masculineArray = document.getElementsByClassName('masculine');
const feminineArray = document.getElementsByClassName('feminine');
const neutralArray = document.getElementsByClassName('neutral');

for (let i = 0; i < masculineArray.length; i++) {
    masculineArray[i].style.color = "royalblue";
};
for (let i = 0; i < feminineArray.length; i++) {
    feminineArray[i].style.color = "rgb(230, 63, 63)";
};
for (let i = 0; i < neutralArray.length; i++) {
    neutralArray[i].style.color = "rgb(45, 185, 45)";
};



// initial standard
setCardsNumber();


// shuffle function
// NOT WORKING
function shuffleArray(arrays) {
	console.log('MMMMMMM  array111  ===>>>  ', arrays)
	let array = JSON.parse(JSON.stringify(arrays));
	
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
	};
	console.log('DDDDDDD  array2222  ===>>>  ', array)
	return array;
};


// let arraybs = [[0, 1], [1, 2] ,[2, 3] ,[3, 4], [4, 5], [5, 6]];
// shuffleArray(arraybs);

// Remove, shuffle and add cards containers to DOM
function shuffleContainers() {
	// remove all elements
	for (let i = 0; i < cardsContainers.length; i++) {
		cardsContainers[i].remove();
	};

	let mixedContainers = shuffleArray(cardsContainers);

	// set all elements
	for (let i = 0; i < cardsContainers.length; i++) {
		firstPartMain.appendChild(mixedContainers[i]);
	};
};




// MATCH, UNMATCH, LIMIT THE POSSIBILITY OF FLIP TO ONLY TWO,
for (let i = 0; i < checks.length; i++) {
  	checks[i].onclick = checkFlip;
};


function checkFlip (event) {
	let stopTime;
	
	// CHECK IF CARD IS SELECTED, BUT NOT MATCHED
	for (let k = 0; k < checks.length; k++) {

		if (checks[k].checked == true && checks[k].disabled == false && checkedChecks.includes(checks[k]) == false) {

			checkedChecks.push(checks[k]);

			// PREVENT ERROR from undefined second element
			if (checkedChecks[1] != undefined) {
				// REQUIRE: CHANGE TO ASYNC AWAIT? TO SET BETTER THE TIME AND CHECKS TO FLIP CARDS?

				// match check
				if (checkedChecks[0].value == checkedChecks[1].value && checkedChecks.length == 2) {

					checkedChecks[0].disabled = true;
					checkedChecks[1].disabled = true;
					checkedChecks = [];
		
				// prevent click before the timeout
				} else if (checkedChecks.length > 2) {

					clearTimeout(stopTime); // clear time if check a third option before the setTimeout finish
					resetChecks()

				}  else if (checkedChecks[0].value != checkedChecks[1].value && checkedChecks.length == 2) {

					// SET TIME TO FLIP BACK AFTER CLICK IN ANOTHER CARD (if ANOTHER CARD WAS NOT CHECKED)
					stopTime = setTimeout(function(){
						resetChecks()
					}, 2000);
				};
			};
		};
  	};
};



// reset checks from option not matched
function resetChecks() {
	for (let j = 0; j < checkedChecks.length; j++) {
		checkedChecks[j].checked = false;
	};
	checkedChecks = [];
};



// buttons for number of cards
function setCardsNumber() {
	if (reloadPage) {
		for (let z = 0; z < buttonCardsNumber.length; z++) {
			if (buttonCardsNumber[z].checked) {
				numberOfCards = buttonCardsNumber[z].value;
			};
		};
	};

	// start with 12 cards
	for (let z = 0; z < checks.length; z++) {
		for (let k = 0; k < checks.length; k++) {
			if (checks[z].value == checks[k].value && contadorPares < numberOfCards) {

				flipCards[z].classList.add('showElement');
				flipCards[k].classList.add('showElement');
				contadorPares++;

			};
		};
	};
};




// RESTART BUTTON: INITIAL CARDS CONDITIONS
function initialCardsSets() {
	reloadPage = true;
	contadorPares = 0;

	// uncheck all cards
	for (let y = 0; y < checks.length; y++) {
		checks[y].checked = false;
		checks[y].disabled = false;
  	};

	// remove all check card to another cards
	for (let z = 0; z < checks.length; z++) {
		flipCards[z].classList.remove('showElement');
	};

	shuffleContainers();

	// set the number of cards
	setCardsNumber();

	// uncheck buttons of cards number
	for (let z = 0; z < buttonCardsNumber.length; z++) {
		buttonCardsNumber[z].checked = false;
	};
};
restartButton.onclick = initialCardsSets;