import { useEffect, useState } from 'react';
import './App.css';
import { CLIENT, LOGIN_STATUS, SERVER } from './constants';
import { fetchLogin, fetchLogout, fetchSession, fetchUpdateWord, fetchWord } from './services';

import LoginForm from './LoginForm';
import Loading from './Loading';
import Status from './Status';
import WordDisplay from './Word';

function App() {
  const [word, setWord] = useState({});
  const [username, setUserName] = useState('');
  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);

  function onUpdateWord(word) {
    fetchUpdateWord( { word })
        .then(updatedWord => {
            setWord(updatedWord);
            setError('');
        })
        .catch(err => {
            setError(err?.error || 'ERROR');
        });
  }


  function onLogin(username) {
    fetchLogin(username)
      .then( fetchWords => {
        setError('');
        setWord(fetchWords.word);
        setUserName(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onLogout() {
    setError('');
    setUserName('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout()
      .catch(err => {
        setError(err?.error || 'ERROR')
      });
  }

  function checkForSession() {
    fetchSession()
      .then(session => {
        setUserName(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchWord();
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION })
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

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  return (
    <div className="App">
      <main>
        {error && <Status error={error} />}
        {loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className='word'>
            <div className='word__greeting'>Hello, {username}!</div>
            <button className='word__logoutbutton' onClick={onLogout}>Log out</button>
            <WordDisplay
              isDisplayPending={loginStatus !== LOGIN_STATUS.IS_LOGGED_IN}
              word={word}
              onUpdateWord={onUpdateWord}
            /> 
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
