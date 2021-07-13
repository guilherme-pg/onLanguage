
var primaryLanguage = '';
var secondaryLanguage = '';
// var shuffledArray = [];



class Games {

    memory(datareturned, bodyReqData) {
        return new Promise((resolve, reject) => {
            let arrayOfObjects = [];
            let cardsNumber = bodyReqData.option_cards / 2;   //cards number selected
            // console.log('cardsNumber  ===  ', cardsNumber);
            
            primaryLanguage = bodyReqData.option_language;
            secondaryLanguage = bodyReqData.option2_language;

            // query for on language
            if (bodyReqData.option_language_method == 'mono') {
                let dataMixed = datareturned.sort(() => Math.random() - 0.5);
                let dataSliced = dataMixed.slice(0, cardsNumber);
                let duplicatedArray = JSON.parse(JSON.stringify(dataSliced));
                let concatArray = dataSliced.concat(duplicatedArray);
                let shuffledArray = concatArray.sort(() => Math.random() - 0.5);

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
                let dataMixed = datareturned.sort(() => Math.random() - 0.5);
                let dataSliced = dataMixed.slice(0, cardsNumber);
                let duplicatedArray = JSON.parse(JSON.stringify(dataSliced));

                arrayOfObjects = [];
                for (let i = 0; i < dataSliced.length; i++) {
                    arrayOfObjects.push({
                        id: dataSliced[i]['_id'],
                        article: dataSliced[i][primaryLanguage]['article'],
                        word: dataSliced[i][primaryLanguage]['word'],
                        gender: dataSliced[i][primaryLanguage]['gender']
                    });
                    arrayOfObjects.push({
                        id: duplicatedArray[i]['_id'],
                        article: duplicatedArray[i][secondaryLanguage]['article'],
                        word: duplicatedArray[i][secondaryLanguage]['word'],
                        gender: duplicatedArray[i][secondaryLanguage]['gender']
                    });
                };

                let shuffledArray = arrayOfObjects.sort(() => Math.random() - 0.5);

            } else {
                arrayOfObjects = [];
            };

            return resolve(arrayOfObjects);
        });
    };



    hangman(datareturned, bodyReqData) {
        return new Promise((resolve, reject) => {
            let arrayOfLetters = [];
            let dataMixed = datareturned.sort(() => Math.random() - 0.5);
            let dataSliced = dataMixed.slice(0, 1);
            let languageSelected = bodyReqData.option_language;
            
            let wordSelected = dataSliced[0][languageSelected]['word'];
            let lettersArray = wordSelected.split('');
            for (let i = 0; i < lettersArray.length; i++) {
                arrayOfLetters.push({
                    letter: lettersArray[i]
                });
            };

            return resolve(arrayOfLetters);
        })
    };
    


    formWords(datareturned, bodyReqData) {
        return new Promise((resolve, reject) => {
            let wordsSelected = [];
            let arrayOfLetters = [[], [], [], [], [], [], [], [], [], []];
            let arrayOfArrayOfLetters = [[], [], [], [], [], [], [], [], [], []];
            let arrayOfMixedLetters = [[], [], [], [], [], [], [], [], [], []];
            let objectWithWordAndLetters = [];
            let dataMixed = datareturned.sort(() => Math.random() - 0.5);
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
                arrayOfMixedLetters[i] = arrayOfMixedLetters[i].sort(() => Math.random() - 0.5);
            };


            for (let i = 0; i < arrayOfLetters.length; i++) {
                if (arrayOfArrayOfLetters[i] == arrayOfMixedLetters[i]) {
                    while (arrayOfArrayOfLetters[i] == arrayOfMixedLetters[i]) {
                        arrayOfMixedLetters[i] = arrayOfMixedLetters[i].sort(() => Math.random() - 0.5);
                    };
                };
            };

            objectWithWordAndLetters.push({
                arrayOfCorrectWOrds: wordsSelected,
                arrayOfOrderedLetters: arrayOfArrayOfLetters,
                arrayOfMixedLetters: arrayOfMixedLetters
            });

            return resolve(objectWithWordAndLetters);
        })
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
                let wrongWordsArrayMixed = wrongWordsArray.sort(() => Math.random() - 0.5);

                // push in the array 3 wrong answers and the correct
                let fourAnswersArray = [];
                fourAnswersArray.push(secondLanguageAnswersArray[i], wrongWordsArrayMixed[0], wrongWordsArrayMixed[1], wrongWordsArrayMixed[2]);
                
                // shuffle all 4 answers
                // let fourAnswersArrayMixed = [];
                let fourAnswersArrayMixed = fourAnswersArray.sort(() => Math.random() - 0.5);

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



    // REQUIRE: SET MULTIPLE CARDS
    // falshCard(datareturned, bodyReqData) {
    //     return new Promise((resolve, reject) => {
            
            
    //         return resolve();
    //     })
    // };

    tablesVisualization(datareturned, bodyReqData) {
        return new Promise((resolve, reject) => {
            let dataset;
            dataset = datareturned;

            // REQUIRE: SIMPLIFICATION
            // REQUIRE: UPPER CASE IN TITLE
            for (let i = 0; i < dataset.length; i++) {
                dataset[i].firstLanguage = dataset[i][`${bodyReqData.name_first_language}`];
                dataset[i].secondLanguage = dataset[i][`${bodyReqData.name_second_language}`];
            };

            dataset.theFirstLanguage = `${bodyReqData.name_first_language}`;
            dataset.theSecondLanguage = `${bodyReqData.name_second_language}`;

            return resolve(dataset);
        });
    };


};

module.exports = Games;