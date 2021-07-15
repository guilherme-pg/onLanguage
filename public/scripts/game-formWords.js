
const buttonNext = document.getElementById('button_next');
const buttonResolve = document.getElementById('button_resolve');
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
const containersResults = document.querySelectorAll('.container_results');
let questNumber = 0;
let cont = 0;

let correctWord = document.getElementById(`letter_checkable_${questNumber}`).textContent;

// INITIAL DISPLAY CONFIGURATIONS
const containerChallenger = document.querySelectorAll('.container_challenger');
containerChallenger[0].classList.add('showElement');




draggables.forEach(draggable => {

    // hold the click in a draggable element
	draggable.addEventListener('dragstart', () => {
		draggedItem = draggable;
		draggable.classList.add('dragging');
	});

    // set hidden in the page while hold the element
    draggable.addEventListener('dragover', () => {
        draggedItem.style.visibility  = 'hidden';
    });
  
    // show the element when drop it
    draggable.addEventListener('dragend', () => {
        draggable.style.visibility  = 'visible';
        draggable.classList.remove('dragging');

        // get the elements in the answer/drop letters container
        let containerOfDraggables = document.getElementById(`container_answer_${questNumber}`);
        let draggablesInAnswerContainer = containerOfDraggables.children;

        // check answer if all the letters of the initial container were dropped on upper container
        if (correctWord.length == draggablesInAnswerContainer.length) {
            let concatenatedWord = '';

            // check if all the letters were put in the drop container
            for (let i = 0; i < draggablesInAnswerContainer.length; i++) {

                // concat the letters of the answer to check next if its correct
                str = draggablesInAnswerContainer[i].textContent;
                concatenatedWord = concatenatedWord.concat(str);
            };

            // check, change color and disable the drag
            if (correctWord == concatenatedWord) {
                for (let z = 0; z < draggables.length; z++) {
                    draggables[z].classList.add('correct_answer')
                    draggables[z].draggable = false;
                };
                // checkAnswers(concatenatedWord, true);

            } else {
                for (let z = 0; z < draggables.length; z++) {
                    draggables[z].classList.add('wrong_answer')
                    draggables[z].draggable = false;
                };
                // checkAnswers(concatenatedWord, false);
            };
        };
    });
});
  

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientX);
        const draggable = document.querySelector('.dragging');
        // container.appendChild(draggable);

        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        };
    });
});


function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {

        // MOUSE POSITION
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        };
    }, {offset: Number.NEGATIVE_INFINITY}).element;
};




// CHECK RESULT
function checkAnswers(concatenatedWord, answer) {
    if (answer == true) {

    } else {
        
    };
};




// resolution
function resolveProblem() {
    if (cont == 0) {
        containersResults[questNumber].classList.add('showElement');
        cont = 1;
    } else {
        containersResults[questNumber].classList.remove('showElement');
        cont = 0;
    };
};
buttonResolve.onclick = resolveProblem;


// quest counter
let numberOfQuests = containerChallenger.length;
for (let i = 0; i < numberOfQuests; i++) {
    document.getElementById(`quest_counter_${i}`).innerText = `${i+1} / ${numberOfQuests}`;
};


function endingFeedback() {
    document.getElementsByClassName('container_feedback')[0].classList.add('showElement');
    document.getElementsByClassName('button_resource')[0].classList.add('hiddenElement');
    document.getElementsByClassName('button_resource')[1].classList.add('hiddenElement');
};




// Next quest
function nextQuest() {
    containerChallenger[questNumber].classList.remove('showElement');
    questNumber++

    if (questNumber >= containerChallenger.length) {
        endingFeedback();

    } else {
        containerChallenger[questNumber].classList.add('showElement');
        for (let i = 0; i < draggables.length; i++) {
            draggables[i].draggable = true;
            draggables[i].classList.remove('correct_answer');
            draggables[i].classList.remove('wrong_answer');
        };
        correctWord = document.getElementById(`letter_checkable_${questNumber}`).textContent;
    };
};
buttonNext.onclick = nextQuest;
