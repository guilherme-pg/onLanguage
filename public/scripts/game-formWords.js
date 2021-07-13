// REQUIRE: IMPLEMENT NEXT BUTTON
// REQUIRE: IMPLEMENT FEEDBACK
// REQUIRE: IMPLEMENT NUMBER OF QUESTS

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
containerChallenger[0].classList.remove('hiddenElement');




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

            } else {
                for (let z = 0; z < draggables.length; z++) {
                    draggables[z].classList.add('wrong_answer')
                    draggables[z].draggable = false;
                };
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
// let checkables = document.querySelectorAll('.checkable');
// let concatenatedWord = '';
// for (let i = 0; i < checkables.length; i++) {
//     let str = checkables[i].textContent;
//     concatenatedWord = concatenatedWord.concat(str);
// };





// resolve problem:
// 1. move all draggables to the correct place
// 2. move in the correct order
function resolveProblem() {
    if (cont == 0) {
        containersResults[questNumber].classList.remove('hiddenElement');
        cont = 1;
    } else {
        containersResults[questNumber].classList.add('hiddenElement');
        cont = 0;
    };
};
buttonResolve.onclick = resolveProblem;




// Next quest
function nextQuest() {
    containerChallenger[questNumber].classList.add('hiddenElement');
    questNumber++
    containerChallenger[questNumber].classList.remove('hiddenElement');
    for (let i = 0; i < draggables.length; i++) {
        draggables[i].draggable = true;
        draggables[i].classList.remove('correct_answer');
        draggables[i].classList.remove('wrong_answer');
    };
    correctWord = document.getElementById(`letter_checkable_${questNumber}`).textContent;
};
buttonNext.onclick = nextQuest;
