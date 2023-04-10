function makeWordObject(){
    const wordObject = {};
    let word = '';

    wordObject.getWord = function getWords(){
        return word;
    }

    wordObject.updateWord = function updateWord(newWord){
        word = newWord;
    }

    return wordObject;
}

module.exports = {
    makeWordObject,
};