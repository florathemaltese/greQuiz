const react = require("./react.js");
const storage = require("./storage");
const service = require("./services");

const controller = {
  // User object containing methods for fetching session, login, and logout
  user: {
    fetchSession() {
      // Reset stored values for username and word list
      storage.username = undefined;
      storage.wordList = undefined;
      // Fetch session data from server
      return fetch("/api/session")
          .catch((err) => {
            // If there's a network error, reject the promise with the error
            return Promise.reject(err);
          })
          .then((res) => {
            if (!res.ok) {
              return Promise.reject({ err: "Invalid User" });
            }
            return res.json();
          })
          .then((res) => {
            storage.username = res.username;
            return controller.word.fetchWord();
          })
          .then((res) => {
            storage.wordList = res.storedWord;
          });
    },

    fetchLogin(username) {
      return service.fetchLogin(username).then((res) => {
        storage.username = res.username;
        return controller.word.fetchWord();
      }).then((res) => {
        storage.wordList = res.storedWord;
      });
    },

    fetchLogout() {
      const session = fetch("/api/session/", {
        method: "DELETE",
        headers: {
          "content-type": "application/json", // set this header when sending JSON in the body of request
        },
      }).catch((err) => Promise.reject({ error: "network-error" }));
      return session;
    },
  },
  word: {
    fetchWord() {
      return fetch("/api/word", {
        method: "GET",
      })
        .catch((err) => {
          storage.errMsg = "Network Error";
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              storage.errMsg = "Error when fetching words";
              return Promise.reject(err);
            });
          }
          return response.json();
        });
    },

    addWord(word) {
      return fetch("/api/word", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ word }),
      })
        .catch((err) => {
          storage.errMsg = "Network Error";
          return Promise.reject(err);
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              storage.errMsg = `Error when adding word ${word}`;
            });
          }
          return response.json();
        })
        .then((response) => (storage.wordList = response.storedWord));
    },
  },

  initEventListener() {
    const appEl = document.querySelector("#app");
    appEl.addEventListener("click", (e) => {
      e.preventDefault();
      storage.errMsg = "";
      switch (e.target.className) {
        case "username-submit":
          const usernameEl = document.querySelector(".username-input");
          controller.user
            .fetchLogin(usernameEl.value)
            .then(() => controller.word.fetchWord())
            .then(() => react.render());
          break;
        case "logout":
          controller.user.fetchLogout().then(() => {
            storage.username = undefined;
            storage.wordList = [];
            react.render();
          });
          break;
        case "word-submit":
          const wordInputEl = document.querySelector(".word-input");
          controller.word
            .addWord(wordInputEl.value)
            .then(() => controller.word.fetchWord())
            .then(() => react.render());
          break;
        default:
          break;
      }
    });
  },
};
module.exports = controller;