
var primaryLanguage = '';
var secondaryLanguage = '';
// var shuffledArray = [];



class Games {

    flashCard(datareturned, bodyReqData) {
        return new Promise((resolve, reject) => {
            console.log('AAAAA  GAMES  bodyReqData ====>>>   ', bodyReqData)
            let primaryLanguage = bodyReqData.option_language;
            let secondaryLanguage = bodyReqData.option2_language;
            let objArray = [];

            datareturned.forEach(element => {
                objArray.push({
                    article1: element[primaryLanguage]['article'],
                    word1: element[primaryLanguage]['word'],
                    gender1: element[primaryLanguage]['gender'],
                    article2: element[secondaryLanguage]['article'],
                    word2: element[secondaryLanguage]['word'],
                    gender2: element[secondaryLanguage]['gender']
                });
            });

            objArray = shuffleArray(objArray);
            
            return resolve(objArray);
        })
    };

    


    formWords(datareturned, bodyReqData) {
        // require: prevent after mixed the correct name
        return new Promise((resolve, reject) => {
            let wordsSelected = [];
            let arrayOfLetters = [[], [], [], [], [], [], [], [], [], []];
            let arrayOfArrayOfLetters = [[], [], [], [], [], [], [], [], [], []];
            let arrayOfMixedLetters = [[], [], [], [], [], [], [], [], [], []];
            let objectWithWordAndLetters = [];
            let dataMixed = shuffleArray(datareturned);
            let dataSliced = dataMixed.slice(0, 10);
            let languageSelected = bodyReqData.option_language;

            // selecting the words
            for (let i = 0; i < dataSliced.length; i++) {
                wordsSelected.push(dataSliced[i][languageSelected]['word']);
            };

            // separating words into letters inside each array
            for (let i = 0; i < wordsSelected.length; i++) {
                arrayOfLetters[i].push(`${wordsSelected[i]}`);           //push word to an array
                arrayOfLetters[i] = arrayOfLetters[i][0].split('');        //transform word in letters     
            };

            // transform an array of words array into array of array of letters
            for (let i = 0; i < arrayOfLetters.length; i++) {           // for each array in array
                for (let z = 0; z < arrayOfLetters[i].length; z++) {     // for each element in array
                    arrayOfArrayOfLetters[i].push({letter: arrayOfLetters[i][z]});
                };

                // populate and mix the arrays of letters
                arrayOfMixedLetters[i] = [...arrayOfArrayOfLetters[i]];
                arrayOfMixedLetters[i] = shuffleArray(arrayOfMixedLetters[i]);
            };


            for (let i = 0; i < arrayOfLetters.length; i++) {
                if (arrayOfArrayOfLetters[i] == arrayOfMixedLetters[i]) {
                    while (arrayOfArrayOfLetters[i] == arrayOfMixedLetters[i]) {
                        arrayOfMixedLetters[i] = shuffleArray(arrayOfMixedLetters[i]);
                    };
                };
            };

            objectWithWordAndLetters.push({
                arrayOfCorrectWOrds: wordsSelected,
                arrayOfOrderedLetters: arrayOfArrayOfLetters,
                arrayOfMixedLetters: arrayOfMixedLetters
            });

            let finalArray = [];
            for (let i = 0; i < arrayOfLetters.length; i++) {
                finalArray.push({
                    correctWord: wordsSelected[i],
                    arrayOfOrderedLetters: arrayOfArrayOfLetters[i],
                    arrayOfMixedLetters: arrayOfMixedLetters[i],
                })
            };

            return resolve(finalArray);
        })
    };




    hangman(datareturned, bodyReqData) {
        return new Promise((resolve, reject) => {
            let arrayOfArraysOfLetters = [];
            let languageSelected = bodyReqData.option_language;
            let language2Selected = bodyReqData.option2_language;
            let wordSelected = [];
            let wordSelected2 = [];
            let dataMixed = shuffleArray(datareturned);

            for (let z = 0; z < dataMixed.length; z++) {
                wordSelected.push(dataMixed[z][languageSelected]['word'])
                wordSelected2.push(dataMixed[z][language2Selected]['word'])
            };

            for (let i = 0; i < wordSelected.length; i++) {
                let arrayOfLetters = [];
                let lettersArray = wordSelected[i].split('');

                for (let z = 0; z < lettersArray.length; z++) {

                    arrayOfLetters.push({
                        letter: `${lettersArray[z]}`
                    });
                };
                console.log('aaaaaa wordSelected2 ===>>  ', wordSelected2)
                arrayOfArraysOfLetters.push({
                    referenceWord: wordSelected2[i],
                    wordLetters: arrayOfLetters
                });
            };

            return resolve(arrayOfArraysOfLetters);
        });
    };




    memory(datareturned, bodyReqData) {
        return new Promise((resolve, reject) => {
            let arrayOfObjects = [];
            
            primaryLanguage = bodyReqData.option_language;
            secondaryLanguage = bodyReqData.option2_language;

            // query for one language
            if (bodyReqData.option_language_method == 'mono') {
                let dataMixed = shuffleArray(datareturned);
                let duplicatedArray = JSON.parse(JSON.stringify(dataMixed));
                let concatArray = dataMixed.concat(duplicatedArray);
                let shuffledArray = shuffleArray(concatArray);

                arrayOfObjects = [];
                for (let i = 0; i < shuffledArray.length; i++) {
                    arrayOfObjects.push({
                        id: shuffledArray[i]['_id'],
                        article: shuffledArray[i][primaryLanguage]['article'],
                        word: shuffledArray[i][primaryLanguage]['word'],
                        gender: shuffledArray[i][primaryLanguage]['gender']
                    });
                };

            // query for dual language
            } else if (bodyReqData.option_language_method == 'dual') {
                let dataMixed = shuffleArray(datareturned);
                let duplicatedArray = JSON.parse(JSON.stringify(dataMixed));

                arrayOfObjects = [];
                for (let i = 0; i < dataMixed.length; i++) {
                    arrayOfObjects.push({
                        id: dataMixed[i]['_id'],
                        article: dataMixed[i][primaryLanguage]['article'],
                        word: dataMixed[i][primaryLanguage]['word'],
                        gender: dataMixed[i][primaryLanguage]['gender']
                    });
                    arrayOfObjects.push({
                        id: duplicatedArray[i]['_id'],
                        article: duplicatedArray[i][secondaryLanguage]['article'],
                        word: duplicatedArray[i][secondaryLanguage]['word'],
                        gender: duplicatedArray[i][secondaryLanguage]['gender']
                    });
                };

            } else {
                arrayOfObjects = [];
            };

            return resolve(arrayOfObjects);
        });
    };




    multipleChoice(datareturned, bodyReqData) {
        return new Promise((resolve, reject) => {
            let languageSelected = bodyReqData.option_language;
            let secondLanguageSelected = bodyReqData.option2_language;
            let referenceWordArray = [];
            let secondLanguageAnswersArray = [];
            let multipleChoiceArray = [];            

            datareturned.forEach(element => {
                referenceWordArray.push(element[languageSelected]['word']);
                secondLanguageAnswersArray.push(element[secondLanguageSelected]['word']);
            });
            
            for (let i = 0; i < secondLanguageAnswersArray.length; i++) {
                let wrongWordsArray = [];
                for (let k = 0; k < secondLanguageAnswersArray.length; k++) {
                    // verification, collect wrong answers and prevent repetition
                    if (secondLanguageAnswersArray[k] != secondLanguageAnswersArray[i] && wrongWordsArray.includes(secondLanguageAnswersArray[k]) == false) {
                        wrongWordsArray.push(secondLanguageAnswersArray[k]);
                    };
                };
                let wrongWordsArrayMixed = shuffleArray(wrongWordsArray);

                // push in the array 3 wrong answers and the correct
                let fourAnswersArray = [];
                fourAnswersArray.push(secondLanguageAnswersArray[i], wrongWordsArrayMixed[0], wrongWordsArrayMixed[1], wrongWordsArrayMixed[2]);
                
                // shuffle all 4 answers
                // let fourAnswersArrayMixed = [];
                
                let fourAnswersArrayMixed = shuffleArray(fourAnswersArray);

                multipleChoiceArray.push({
                    referenceWord: referenceWordArray[i],
                    correctAnswer: secondLanguageAnswersArray[i],
                    answerA: fourAnswersArrayMixed[0],
                    answerB: fourAnswersArrayMixed[1],
                    answerC: fourAnswersArrayMixed[2],
                    answerD: fourAnswersArrayMixed[3],
                });
            };

            return resolve(multipleChoiceArray);
        })
    };




    write(datareturned, bodyReqData) {
        return new Promise((resolve, reject) => {
            let languageSelected = bodyReqData.option_language;
            let secondLanguageSelected = bodyReqData.option2_language;
            let objArray = [];

            datareturned.forEach(element => {
                objArray.push({
                    language1Article: element[languageSelected]['article'],
                    language1Word: element[languageSelected]['word'],
                    language2Article: element[secondLanguageSelected]['article'],
                    language2Word: element[secondLanguageSelected]['word']
                });
            });

            objArray = shuffleArray(objArray);

            return resolve(objArray);
        });
    };




    tablesVisualization(datareturned, bodyReqData) {
        return new Promise((resolve, reject) => {
            let dataset = [];

            // REQUIRE: UPPER CASE IN TITLE
            for (let i = 0; i < datareturned.length; i++) {
                dataset.push({
                    theme: datareturned[i].name_theme,
                    level: datareturned[i].name_level,
                    firstLanguage: `${bodyReqData.option_language}`,
                    secondLanguage: `${bodyReqData.option2_language}`,
                    dataFirstLanguage: datareturned[i][`${bodyReqData.option_language}`],
                    dataSecondLanguage: datareturned[i][`${bodyReqData.option2_language}`]
                });
            };

            return resolve(dataset);
        });
    };
};




function shuffleArray(arrays) {
	let array = JSON.parse(JSON.stringify(arrays));
	
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
	};
	return array;
};


module.exports = Games;