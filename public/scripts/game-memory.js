// REQUIRE: SEND ALL DATA AT ONCE TO PREVENT RELOAD THE PAGE
// REQUIRE: IMPLEMENT RESTART BUTTON WITHOUT RELOAD

// REQUIRE: CHANGE COLOR WHEN ITS CORRECT
// REQUIRE: CORRECT THE COLOR SCHEMA
// REQUIRE: CHANGE ALL DESIGN
// REQUIRE: CORRECT THE LOGIC


// CHANGE COLORS ACCORDING THE GENDERS
let masculineArray = document.getElementsByClassName('masculine');
let feminineArray = document.getElementsByClassName('feminine');
let neutralArray = document.getElementsByClassName('neutral');

for (let i = 0; i < masculineArray.length; i++) {
    masculineArray[i].style.color = "royalblue";
};
for (let i = 0; i < feminineArray.length; i++) {
    feminineArray[i].style.color = "red";
};
for (let i = 0; i < neutralArray.length; i++) {
    neutralArray[i].style.color = "green";
};





// MATCH, UNMATCH, LIMIT THE POSSIBILITY OF FLIP TO ONLY TWO,
let checks = document.querySelectorAll('.checks');


for (let i = 0; i < checks.length; i++) {
  	checks[i].onclick = checkFlip;
};


function checkFlip (event) {

	let stopTime;
	let checkedChecks = [];
	
	// CHECK IF CARD IS SELECTED, BUT NOT MATCHED
	for (let k = 0; k < checks.length; k++) {

		if (checks[k].checked == true && checks[k].disabled == false && checkedChecks.includes(checks[k]) == false) {

			checkedChecks.push(checks[k]);

			// PREVENT ERROR from undefined second element
			if (checkedChecks[1] != undefined) {

				// REQUIRE: CHANGE TO ASYNC AWAIT? TO SET BETTER THE TIME AND CHECKS TO FLIP CARDS?
				// REQUIRE: PREVENT CHECKS BEFORE THE THIRD CLICK

				// MATCH check
				if (checkedChecks[0].value == checkedChecks[1].value && checkedChecks.length == 2) {

					checkedChecks[0].disabled = true;
					checkedChecks[1].disabled = true;
					checkedChecks.splice(0, 2);
		
				// PREVENT CLICK BEFORE THE TIMEOUT
				} else if (checkedChecks.length > 2) {

					clearTimeout(stopTime);
					checkedChecks[0].checked = false;
					checkedChecks[1].checked = false;
					checkedChecks.splice(0, 2);

				}  else if (checkedChecks[0].value != checkedChecks[1].value && checkedChecks.length == 2) {

					// SET TIME TO FLIP BACK AFTER CLICK IN ANOTHER CARD (if ANOTHER CARD WAS NOT CHECKED)
					stopTime = setTimeout(function(){
						checkedChecks[0].checked = false;
						checkedChecks[1].checked = false;
						checkedChecks.splice(0, 2);
					}, 2000);
				};
			};
		};
  	};
};



// RESTART INITIAL CARDS CONDITIONS
function initialCardsSets() {
	for (let y = 0; y < checks.length; y++) {
		checks[y].checked = false;
		checks[y].disabled = false;
  	};
};
let restartButton = document.getElementById('button_restart');
restartButton.onclick = initialCardsSets;