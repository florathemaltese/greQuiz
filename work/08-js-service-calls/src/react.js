// Import necessary modules.
const controller = require("./controller.js");
const storage = require("./storage.js");

// Define an object called "react" that contains various rendering functions.
const react = {
  render() {
    react.renderUserStatus();
    react.renderErrMsg();
    react.renderLoginForm();
    react.renderWordForm();
  },
  renderUserStatus() {
    const userEl = document.querySelector(".user");
    const isLoggedIn = storage.username !== undefined;
    const loginHTML = `<a href="" class="login">Log In</a>`;
    const logoutHTML = `<a href="" class="logout">Log out</a>`;
    userEl.innerHTML = isLoggedIn ? logoutHTML : loginHTML;
  },

  renderLoginForm() {
    const loginEl = document.querySelector(".login-form");
    if (!storage.username) {
      loginEl.innerHTML = `
          <form action="">
              <label>Username: <input type="text" class="username-input"></label>
              <button type="submit" class="username-submit">Submit</button>
          </form>
          `;
    } else {
      loginEl.innerHTML = "";
    }
  },
  renderWordForm() {
    const wordList = storage.wordList;
    const wordEl = document.querySelector(".words");
    if (storage.username) {
      const wordListHTML = wordList
        ? `<p>Your word is ${wordList} </p>`
        : `<p>You do not have any word</p>`;
      const wordInputHTML = `
    <form action="">
      <label>
        Update word: <input type="text" class="word-input"></input>
      </label>
      <button class='word-submit' type="submit">Submit</button>
    </form>`;
      wordEl.innerHTML = [wordListHTML, wordInputHTML].join("");
    } else {
      wordEl.innerHTML = "";
    }
  },
  renderErrMsg() {
    const errorMsgEl = document.querySelector(".error-msg");
    if (storage.errMsg) {
      errorMsgEl.innerHTML = `<p>${storage.errMsg}</p>`;
    } else {
      errorMsgEl.innerHTML = "";
    }
  },
};
// Exports the react object, making it available for other modules to import and use.
module.exports = react;