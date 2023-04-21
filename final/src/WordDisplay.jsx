// Import essential components.
import Loading from './Loading';
import Word from './Word';

function WordDisplay({ isDisplayPending, word, onUpdateWord }) {
    return (
        // a container for displaying the "word" prop and a loading indicator conditionally based on the value of "isDisplayPending".
        <div className="word__display">
            {isDisplayPending && <Loading className="word__loading">Loading...</Loading>}
            {!isDisplayPending && <Word word={word} onUpdateWord={onUpdateWord} />}
        </div>
    );
}

export default WordDisplay;
