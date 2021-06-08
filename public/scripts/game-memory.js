// const { CommandCursor } = require("mongodb");


// CHANGE COLORS ACCORDING THE GENDERS
let masculineArray = document.getElementsByClassName('masculine');
let feminineArray = document.getElementsByClassName('feminine');
let neutralArray = document.getElementsByClassName('neutral');

for (let i = 0; i < masculineArray.length; i++) {
    masculineArray[i].style.color = "blue";
};
for (let i = 0; i < feminineArray.length; i++) {
    feminineArray[i].style.color = "red";
};
for (let i = 0; i < neutralArray.length; i++) {
    neutralArray[i].style.color = "green";
};





// MATCH, UNMATCH, LIMIT THE POSSIBILITY OF FLIP TO ONLY TWO,
var checks = document.querySelectorAll('.checks');


for (let i = 0; i < checks.length; i++) {
  checks[i].onclick = checkFlip;
};



function checkFlip (event) {

  let stopTime;
  let checkedChecks = [];
  
  // CHECK IF CARD IS SELECTED, BUT NOT MATCHED
  for (let i = 0; i < checks.length; i++) {
    if (checks[i].checked == true && checks[i].disabled == false && checkedChecks.includes(checks[i]) == false) {

      checkedChecks.push(checks[i]);

      // PREVENT ERROR from undefined element
      if (checkedChecks[1] != undefined) {

        // MATCH AND UNMACHT
        if (checkedChecks[0].value == checkedChecks[1].value) {
          checkedChecks[0].disabled = true;
          checkedChecks[1].disabled = true;
          checkedChecks.splice(0, 2);
  
        } else if (checkedChecks.length == 2) {
          stopTime = setTimeout(function(){
            checkedChecks[0].checked = false;
            checkedChecks[1].checked = false;
            checkedChecks.splice(0, 2);
          }, 2000);
          
          // PREVENT CLICK BEFORE THE TIMEOUT
        } else if (checkedChecks.length >= 3) {
          clearTimeout(stopTime);
          checkedChecks[0].checked = false;
          checkedChecks[1].checked = false;
          checkedChecks.splice(0, 2);
        };
      };
    };
  };
};
