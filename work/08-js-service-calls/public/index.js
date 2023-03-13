/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var react = __webpack_require__(/*! ./react.js */ "./src/react.js");
var storage = __webpack_require__(/*! ./storage */ "./src/storage.js");
var service = __webpack_require__(/*! ./services */ "./src/services.js");
var controller = {
  // User object containing methods for fetching session, login, and logout
  user: {
    fetchSession: function fetchSession() {
      // Reset stored values for username and word list
      storage.username = undefined;
      storage.wordList = undefined;
      // Fetch session data from server
      return fetch("/api/session")["catch"](function (err) {
        // If there's a network error, reject the promise with the error
        return Promise.reject(err);
      }).then(function (res) {
        if (!res.ok) {
          return Promise.reject({
            err: "Invalid User"
          });
        }
        return res.json();
      }).then(function (res) {
        storage.username = res.username;
        return controller.word.fetchWord();
      }).then(function (res) {
        storage.wordList = res.storedWord;
      });
    },
    fetchLogin: function fetchLogin(username) {
      return service.fetchLogin(username).then(function (res) {
        storage.username = res.username;
        return controller.word.fetchWord();
      }).then(function (res) {
        storage.wordList = res.storedWord;
      });
    },
    fetchLogout: function fetchLogout() {
      var session = fetch("/api/session/", {
        method: "DELETE",
        headers: {
          "content-type": "application/json" // set this header when sending JSON in the body of request
        }
      })["catch"](function (err) {
        return Promise.reject({
          error: "network-error"
        });
      });
      return session;
    }
  },
  word: {
    fetchWord: function fetchWord() {
      return fetch("/api/word", {
        method: "GET"
      })["catch"](function (err) {
        storage.errMsg = "Network Error";
      }).then(function (response) {
        if (!response.ok) {
          return response.json().then(function (err) {
            storage.errMsg = "Error when fetching words";
            return Promise.reject(err);
          });
        }
        return response.json();
      });
    },
    addWord: function addWord(word) {
      return fetch("/api/word", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          word: word
        })
      })["catch"](function (err) {
        storage.errMsg = "Network Error";
        return Promise.reject(err);
      }).then(function (response) {
        if (!response.ok) {
          return response.json().then(function (err) {
            storage.errMsg = "Error when adding word ".concat(word);
          });
        }
        return response.json();
      }).then(function (response) {
        return storage.wordList = response.storedWord;
      });
    }
  },
  initEventListener: function initEventListener() {
    var appEl = document.querySelector("#app");
    appEl.addEventListener("click", function (e) {
      e.preventDefault();
      storage.errMsg = "";
      switch (e.target.className) {
        case "username-submit":
          var usernameEl = document.querySelector(".username-input");
          controller.user.fetchLogin(usernameEl.value).then(function () {
            return controller.word.fetchWord();
          }).then(function () {
            return react.render();
          });
          break;
        case "logout":
          controller.user.fetchLogout().then(function () {
            storage.username = undefined;
            storage.wordList = [];
            react.render();
          });
          break;
        case "word-submit":
          var wordInputEl = document.querySelector(".word-input");
          controller.word.addWord(wordInputEl.value).then(function () {
            return controller.word.fetchWord();
          }).then(function () {
            return react.render();
          });
          break;
        default:
          break;
      }
    });
  }
};
module.exports = controller;

/***/ }),

/***/ "./src/react.js":
/*!**********************!*\
  !*** ./src/react.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Import necessary modules.
var controller = __webpack_require__(/*! ./controller.js */ "./src/controller.js");
var storage = __webpack_require__(/*! ./storage.js */ "./src/storage.js");

// Define an object called "react" that contains various rendering functions.
var react = {
  render: function render() {
    react.renderUserStatus();
    react.renderErrMsg();
    react.renderLoginForm();
    react.renderWordForm();
  },
  renderUserStatus: function renderUserStatus() {
    var userEl = document.querySelector(".user");
    var isLoggedIn = storage.username !== undefined;
    var loginHTML = "<a href=\"\" class=\"login\">Log In</a>";
    var logoutHTML = "<a href=\"\" class=\"logout\">Log out</a>";
    userEl.innerHTML = isLoggedIn ? logoutHTML : loginHTML;
  },
  renderLoginForm: function renderLoginForm() {
    var loginEl = document.querySelector(".login-form");
    if (!storage.username) {
      loginEl.innerHTML = "\n          <form action=\"\">\n              <label>Username: <input type=\"text\" class=\"username-input\"></label>\n              <button type=\"submit\" class=\"username-submit\">Submit</button>\n          </form>\n          ";
    } else {
      loginEl.innerHTML = "";
    }
  },
  renderWordForm: function renderWordForm() {
    var wordList = storage.wordList;
    var wordEl = document.querySelector(".words");
    if (storage.username) {
      var wordListHTML = wordList ? "<p>Your word is ".concat(wordList, " </p>") : "<p>You do not have any word</p>";
      var wordInputHTML = "\n    <form action=\"\">\n      <label>\n        Update word: <input type=\"text\" class=\"word-input\"></input>\n      </label>\n      <button class='word-submit' type=\"submit\">Submit</button>\n    </form>";
      wordEl.innerHTML = [wordListHTML, wordInputHTML].join("");
    } else {
      wordEl.innerHTML = "";
    }
  },
  renderErrMsg: function renderErrMsg() {
    var errorMsgEl = document.querySelector(".error-msg");
    if (storage.errMsg) {
      errorMsgEl.innerHTML = "<p>".concat(storage.errMsg, "</p>");
    } else {
      errorMsgEl.innerHTML = "";
    }
  }
};
// Exports the react object, making it available for other modules to import and use.
module.exports = react;

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin)
/* harmony export */ });
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((module) => {

var storage = {
  username: undefined,
  wordList: undefined,
  errMsg: ""
};
module.exports = storage;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
var controller = __webpack_require__(/*! ./controller.js */ "./src/controller.js");
var react = __webpack_require__(/*! ./react.js */ "./src/react.js");
controller.initEventListener();
// Render for a resumed session
controller.user.fetchSession().then(function () {
  return react.render();
});
// Render for a new session
react.render();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map