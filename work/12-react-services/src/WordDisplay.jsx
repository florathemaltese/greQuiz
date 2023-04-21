import { useState } from "react";
import Loading from './Loading';

function Word({ word, onUpdateWord }) {
    const wordOutput = word === '' ? 'No word is stored' : `Your word is ${word}.`;
    const [newWord, setNewWord] = useState('');

    function onChange(e) {
        setNewWord(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        onUpdateWord(newWord);
    }

    return (
        <div className="word__wordform">
            <form className="word__form-frame" action="#/updateWord" onSubmit={onSubmit}>
                <div className="word__form-info">{wordOutput}</div>
                <input className="word__form-input" value={newWord} onChange={onChange} />
                <button className="word__form-submit">Update</button>
            </form>
        </div>
    );
}

function WordDisplay({ isDisplayPending, word, onUpdateWord }) {
    return (
        <div className="word__display">
            {isDisplayPending && <Loading className="word__loading">Loading...</Loading>}
            {!isDisplayPending && <Word word={word} onUpdateWord={onUpdateWord} />}
        </div>
    );
}

export default WordDisplay;
