// Import essential components.
import { useEffect, useState } from 'react';
import './App.css';
import { CLIENT, LOGIN_STATUS, SERVER } from './constants';
import { fetchLogin, fetchLogout, fetchSession, fetchUpdateWord, fetchWord } from './services';
import Quiz from './QuizApp';
import LoginForm from './LoginForm';
import Loading from './Loading';
import Status from './Status';
import WordDisplay from './WordDisplay';
import Cat from './CatLogo';

// Defines the App component, which is the root component of the application. It uses React hooks (useState) to manage the state of word, username, error, and loginStatus with their initial values.
function App() {
    const [word, setWord] = useState({});
    const [username, setUserName] = useState('');
    const [error, setError] = useState('');
    const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);

    // A callback function that is used to update the word state when a word is updated.
    function onUpdateWord(word) {
        fetchUpdateWord({word})
            .then(updatedWord => {
                setWord(updatedWord);
                setError('');
            })
            .catch(err => {
                setError(err?.error || 'ERROR');
            });
    }
    // A callback function that is used to handle the login process, including fetching data from a server, updating the state, and handling errors.
    function onLogin(username) {
        fetchLogin(username)
            .then(fetchWords => {
                setError('');
                setWord(fetchWords.word);
                setUserName(username);
                setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
            })
            .catch(err => {
                setError(err?.error || 'ERROR');
            });
    }
    // A callback function that is used to handle the logout process, including updating the state, and handling errors.
    function onLogout() {
        setError('');
        setUserName('');
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        fetchLogout()
            .catch(err => {
                setError(err?.error || 'ERROR');
            });
    }
    // This function is used to check for an active session on the server, fetch data related to the session, update the state accordingly, and handle errors.
    function checkForSession() {
        fetchSession()
            .then(session => {
                setUserName(session.username);
                setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
                return fetchWord();
            })
            .catch(err => {
                if (err?.error === SERVER.AUTH_MISSING) {
                    return Promise.reject({error: CLIENT.NO_SESSION});
                }
                return Promise.reject(err);
            })
            .then(word => {
                setWord(word);
            })
            .catch(err => {
                if (err?.error === CLIENT.NO_SESSION) {
                    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
                    return;
                }
                setError(err?.error || 'ERROR');
            });
    }

    useEffect(() => {
        checkForSession();
    }, []);
    // Renders different components and UI elements based on the loginStatus state.
    return (
        <div className="App">
            {loginStatus === LOGIN_STATUS.PENDING && (
                <Loading className="login__waiting">Loading user...</Loading>
            )}
            {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
                <div>
                    <header>
                        <h1>GRE Quantitative Reasoning Practice Quiz</h1>
                        <p>
                            Ready, Set, Go!<br />
                            <Cat />
                            <br />
                            Once you log in, the quiz timer will start counting down from 5 minutes. Make sure to manage your time wisely to complete the quiz before the time runs out. When the clock strikes zero, the quiz will be submitted automatically! <br />
                            <br />
                            The quiz is made up of 8 exciting questions. Below each question, you'll find a draft area where you can jot down your thoughts or take notes. <br />
                            <br />
                            Good luck!
                        </p>
                    </header>
                    <LoginForm onLogin={onLogin} />
                </div>
            )}
            {error && <Status error={error} />}
            {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
                <main>
                    {error && <Status error={error} />}
                    <div className="word">
                        <div className="word__greeting">Hello, {username}!</div>
                        <button className="word__logoutbutton" onClick={onLogout}>
                            Log out
                        </button>
                    </div>
                    <div>
                        <Quiz />
                    </div>
                    <WordDisplay
                        isDisplayPending={loginStatus !== LOGIN_STATUS.IS_LOGGED_IN}
                        word={word}
                        onUpdateWord={onUpdateWord}
                    />
                </main>
            )}
        </div>
    );
}

export default App;