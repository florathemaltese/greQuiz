const guessingGame = {
    homePage: function(words, username, gameinfo, gamescore, gamestatus) {
        return `
      <!doctype html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="style.css">
          <title>Word Guessing Game</title>
        </head>
        <body>
          <div class="homePage">
            ${guessingGame.getWordList(words)}
            <div class="guess-history">
              ${guessingGame.guessWordHistory(username, gameinfo)}
              ${guessingGame.matchLetterHistory(username, gameinfo)}
            </div>
            <div class="submit-form">
              ${guessingGame.getGuessScore(username, gamescore)}
              ${guessingGame.guessSubmitResult(username, gamestatus)}
              <form action="/guess" method="POST" class="guess-form">
                Input the word you guess : <input name="guessword">
                <button type="submit">Submit</button>
              </form>
            </div>
            <div class="option-button">
              <form action="/new-game" method="POST" class="new-game">
                <button type="submit">New game</button>
              </form>
              <form action="/logout" method="POST" class="logout">
                <button type="submit">Logout</button>
              </form>
            </div>
          </div>
          <script src="front-end.js"></script>
        </body>
      </html>
    `;
    },

    getWordList: function (words) {
        return `
      <div class="word-list">
        <p>Possible words list:</p>
        ${words.map(word => `
          <span>${word}</span>
        `).join('')}
      </div>
    `;
    },

    guessWordHistory: function(username, gameinfo) {
        return `
      <ol class="preWordList">
        ${Object.keys(gameinfo[username]).map(word => `
          <li>
            <span class="preWord">"${word}"</span>
          </li>
        `).join('')}
      </ol>
    `;
    },

    matchLetterHistory: function(username, gameinfo) {
        return `
      <ol class="matchLetterList">
        ${Object.values(gameinfo[username]).map(letter => `
          <li>
            <span class="matchLetter">matches ${letter} letters.</span>
          </li>
        `).join('')}
      </ol>
    `;
    },

    getGuessScore: function(username, gamescore) {
        return `
      <p>Score: ${gamescore[username]}</p>
    `;
    },

    guessSubmitResult: function(username, gamestatus) {
        if (gamestatus[username]["InputStatus"] === "invalid") {
            return `
        <p>Your guess is not in the possible words list! Please try again.</p>
      `;
        } else if (gamestatus[username]["InputStatus"] === "correct") {
            return `
        <p>Congratulations! Your guess "${gamestatus[username]["mostRecentGuess"]}" is correct!</p>
      `;
        } else if (gamestatus[username]["InputStatus"] === "valid") {
            return `
        <p>Your guess is "${gamestatus[username]["mostRecentGuess"]}", and it matches ${gamestatus[username]["lettersMatch"]} letters. Try again!</p>
      `;
        } else {
            return "<p>Try and guess!</p>";
        }
    },

    findMatchLetters: function(guess, word) {
        const letters0 = word.toUpperCase().split('');
        const letters1 = guess.toUpperCase().split('');
        let result = 0;

        for(let i=0;i<letters0.length;i++){
            for(let j=0;j<letters1.length;j++){
                if(letters0[i]===letters1[j]){
                    result = result + 1;
                    letters1.splice(j,1);
                    break;
                }
            }
        }
        return result;
    },

    exactMatch: function(guess, word) {
        return word.toUpperCase() === guess.toUpperCase();
    },

    pickWord: function (words) {
        return words[Math.floor(Math.random() * words.length)];
    }
};
module.exports = guessingGame;

