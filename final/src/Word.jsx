// Import the necessary dependencies from React.
import React, { useState } from "react";

// Define the "Word" component, which takes two props: "word" and "onUpdateWord".
function Word({ word, onUpdateWord }) {
    // Define a state variable called "newWord" using the useState hook, with an initial value of an empty string.
    const [newWord, setNewWord] = useState('');

    // Define a computed value called "wordOutput", which is  a string containing the current value of "word", or an empty string if "word" is an empty string.
    const wordOutput = word === '' ? '' : `Your note is ${word}.`;

    // Define an event handler called "onChange", which updates the "newWord" state variable with the current value of the input element.
    function onChange(e) {
        setNewWord(e.target.value);
    }

    // Define an event handler called "onSubmit", which prevents the default form submission behavior, and calls the "onUpdateWord" function with the new value of the word as an argument.
    function onSubmit(e) {
        e.preventDefault();
        onUpdateWord(newWord);
    }

    return (
        <div className="word__wordform">
            <form className="word__form-frame" action="#/updateWord" onSubmit={onSubmit}>
                <div className="word__form-info">{wordOutput}</div>
                <input className="word__form-input" value={newWord} onChange={onChange} />
                <button className="word__form-submit">Save your note</button>
            </form>
        </div>
    );
}

// Export the "Word" component as the default export of this module.
export default Word;
