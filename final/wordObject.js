function makeWordObject(){
    const wordObject = {};
    let word = '';
    // Returns the current value of the "word" variable, which is initially an empty string.
    wordObject.getWord = function getWords(){
        return word;
    }
    // Takes a new word as an argument and updates the value of the "word" variable to the new word.
    wordObject.updateWord = function updateWord(newWord){
        word = newWord;
    }

    return wordObject;
}

module.exports = {
    makeWordObject,
};