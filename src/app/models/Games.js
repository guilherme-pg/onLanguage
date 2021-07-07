
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
            let arrayOfLetters = [];
            let arrayOfMixedLetters = [];
            let objectWithWordAndLetters = [];
            let dataMixed = datareturned.sort(() => Math.random() - 0.5);
            let dataSliced = dataMixed.slice(0, 1); 
            let languageSelected = bodyReqData.option_language;
            let wordSelected = dataSliced[0][languageSelected]['word'];
            let lettersArray = wordSelected.split('');

            for (let i = 0; i < lettersArray.length; i++) {
                arrayOfLetters.push({letter: lettersArray[i]});
            };

            for (let i = 0; i < lettersArray.length; i++) {
                arrayOfMixedLetters.push({letter: lettersArray[i]});
            };
            arrayOfMixedLetters = arrayOfMixedLetters.sort(() => Math.random() - 0.5);

            // PREVENT ORDERED WORD =======================      not working
            if (arrayOfMixedLetters == arrayOfLetters) {
                while (arrayOfMixedLetters == arrayOfLetters) {
                    arrayOfMixedLetters = arrayOfMixedLetters.sort(() => Math.random() - 0.5);
                };
            };

            objectWithWordAndLetters.wordletters = arrayOfLetters;
            objectWithWordAndLetters.mixedletters = arrayOfMixedLetters;

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
            }
            let multipleChoiceArrayMixed = multipleChoiceArray.sort(() => Math.random() - 0.5);
            // console.log('YYYYYY   multipleChoiceArrayMixed  ------    ', multipleChoiceArrayMixed);

            return resolve(multipleChoiceArray);
        })
    };



    // REQUIRE: SET MULTIPLE CARDS
    // falshCard(datareturned, bodyReqData) {
    //     return new Promise((resolve, reject) => {
            
            
    //         return resolve();
    //     })
    // };
};

module.exports = Games;