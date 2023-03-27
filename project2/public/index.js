/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/ChatAPI.js":
/*!*******************************!*\
  !*** ./client/src/ChatAPI.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



// Import dependencies
var _require = __webpack_require__(/*! ./chatUI */ "./client/src/chatUI.js"),
  render = _require.render,
  renderChat = _require.renderChat;
var storage = __webpack_require__(/*! ./storage */ "./client/src/storage.js");

// Fetch session data from the server
var fetchSession = function fetchSession() {
  // Send a GET request to the server
  return fetch("/api/v1/user").then(function (res) {
    // If the response is not OK, reject the promise with the error
    if (!res.ok) {
      return res.json().then(function (err) {
        return Promise.reject({
          err: err
        });
      });
    }
    // Otherwise, parse the response as JSON
    return res.json();
  }).then(function (_ref) {
    var username = _ref.username,
      sid = _ref.sid,
      loggedInUserList = _ref.loggedInUserList;
    // Update the storage object with the session data
    storage.username = username;
    storage.sid = sid;
    storage.loggedInUser = loggedInUserList;
  });
};

// create a new session
var createSession = function createSession(username) {
  return fetch("/api/v1/user", {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      username: username
    })
  }).then(function (res) {
    if (!res.ok) {
      return res.json().then(function (err) {
        return Promise.reject({
          err: err
        });
      });
    }
    return res.json();
  }).then(function (res) {
    var username = res.username,
      sid = res.sid,
      loggedInUserList = res.loggedInUserList;
    storage.username = username;
    storage.sid = sid;
    storage.loggedInUser = loggedInUserList;
  });
};
// delete session
var deleteSession = function deleteSession() {
  return fetch("/api/v1/user", {
    method: "DELETE"
  })["catch"](function (err) {
    return Promise.reject({
      err: err
    });
  }).then(function (res) {
    if (!res.ok) {
      return res.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return res.json();
  }).then(function () {
    storage.username = undefined;
    storage.sid = undefined;
    storage.curChat = [];
  });
};
// Fetches the chat messages
var fetchChat = function fetchChat() {
  return fetch("/api/v1/chat").then(function (res) {
    if (!res.ok) {
      return res.json().then(function (err) {
        return Promise.reject({
          err: err
        });
      });
    }
    return res.json();
  }).then(function (chatArr) {
    if (chatArr) {
      storage.curChat = chatArr;
    }
  });
};
// Sends messages to the server
var sendMessage = function sendMessage(message) {
  return fetch("/api/v1/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  });
};

// Initializes the event listeners for the app
var initEventListener = function initEventListener() {
  var appEl = document.querySelector("#app");
  appEl.addEventListener("click", function (e) {
    e.preventDefault();
    switch (e.target.className) {
      case "user-login-submit":
        var username = document.querySelector(".user-login-input").value;
        createSession(username).then(function () {
          return fetchChat();
        }).then(function () {
          return render();
        })["catch"](function () {
          return render();
        });
        break;
      case "logout-button":
        deleteSession().then(function () {
          return render();
        });
        break;
      case "new-message-submit":
        var message = document.querySelector(".new-message-input").value;
        storage.messageDraft = "";
        sendMessage(message)["catch"](function (err) {
          return render();
        }).then(function () {
          return fetchChat();
        }).then(function () {
          return render();
        });
        break;
      default:
        break;
    }
  });
  var chatInputEl = document.querySelector("#app .new-message");
  chatInputEl.addEventListener("input", function (e) {
    e.preventDefault();
    storage.messageDraft = e.target.value;
  });
};

// Initializes the polling for new chat messages
var initPollingChat = function initPollingChat() {
  setInterval(function () {
    return fetchSession().then(function () {
      return fetchChat();
    }).then(function () {
      return renderChat();
    });
  }, 5000);
};
module.exports = {
  fetchSession: fetchSession,
  createSession: createSession,
  deleteSession: deleteSession,
  fetchChat: fetchChat,
  sendMessage: sendMessage,
  initEventListener: initEventListener,
  initPollingChat: initPollingChat
};

/***/ }),

/***/ "./client/src/chatUI.js":
/*!******************************!*\
  !*** ./client/src/chatUI.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



// Require the storage module
var storage = __webpack_require__(/*! ./storage */ "./client/src/storage.js");

// Define a function to render the whole UI
var render = function render() {
  renderUserLogin();
  renderUserlist();
  renderChat();
  renderMessageInput();
};

// Define a function to render the list of logged-in users
var renderUserlist = function renderUserlist() {
  var userlistEl = document.querySelector(".loggedin-users");
  // If the username and session ID are not set in the storage, clear the userlist element
  if (!storage.username || !storage.sid) {
    userlistEl.innerHTML = "";
    return;
  }
  var userlistHTML = storage.loggedInUser.map(function (username) {
    return "<li class='user-list-item'>" + username + "</li>";
  }).join("");
  userlistEl.innerHTML = "<p>User Name:</p><ul class=user-list>" + userlistHTML + "</ul>";
};

// Define a function to render the chat messages
var renderChat = function renderChat() {
  var chatEl = document.querySelector(".chat");
  // If the username is not set in the storage, clear the chat element
  if (!storage.username) {
    chatEl.innerHTML = "";
    return;
  }

  // If there are chat messages in the storage, render them
  // Otherwise, display a message indicating that there are no chat messages yet
  var chatArr = storage.curChat;
  var chatListItemHTML = "";
  for (var i = 0; i < chatArr.length; i++) {
    if (!chatArr[i]) {
      continue;
    }
    var username = Object.keys(chatArr[i])[0];
    var message = chatArr[i][username];
    chatListItemHTML += "<li class='chat-list-item'>" + username + ": " + message + "</li>";
  }
  chatEl.innerHTML = chatListItemHTML ? "<p>Chat History: </p><ul class=chat-list>" + chatListItemHTML + "<ul>" : "<p class='chat-list empty'>You do not have any chat yet.</p>";

  // Scroll to the end of the chat element
  chatEl.scroll(0, chatEl.scrollHeight);
};
var renderUserLogin = function renderUserLogin() {
  var userEl = document.querySelector(".user");
  // If the username and session ID are set in the storage, render a logged-in user view
  if (storage.username && storage.sid) {
    userEl.innerHTML = "<span class='username-prompt'>User Name <span class='username'>" + storage.username + "</span>.</span> <button class='logout-button'>Log out</button>";
  }
  // Otherwise, render a login form
  else {
    userEl.innerHTML = "<form action=''>" + "<span class='login-prompt'>Please log in</span>" + "<label>:" + "<input type='text' class='user-login-input' placeholder='Username'>" + "</label>" + "<button type='submit' class='user-login-submit'>Log In</button>" + "</form>";
  }
};
var renderMessageInput = function renderMessageInput() {
  var messageInputEl = document.querySelector(".new-message");
  if (!storage.username) {
    messageInputEl.innerHTML = "";
    return;
  }
  messageInputEl.innerHTML = "\n  <form action=\"\">\n    <label>\n      Send Message:\n      <input type=\"text\" placeholder=\"Message\" class=\"new-message-input\" value=".concat(storage.messageDraft, ">\n    </label>\n    <button type=\"submit\" class=\"new-message-submit\">Send</button>\n  </form>\n  ");
};
module.exports = {
  render: render,
  renderChat: renderChat
};

/***/ }),

/***/ "./client/src/storage.js":
/*!*******************************!*\
  !*** ./client/src/storage.js ***!
  \*******************************/
/***/ ((module) => {



var storage = {
  username: null,
  sid: null,
  curChat: [],
  loggedInUser: [],
  messageDraft: ""
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/


// Importing necessary functions from external modules
var _require = __webpack_require__(/*! ./src/ChatAPI */ "./client/src/ChatAPI.js"),
  initEventListener = _require.initEventListener,
  fetchSession = _require.fetchSession,
  fetchChat = _require.fetchChat,
  initPollingChat = _require.initPollingChat;
var _require2 = __webpack_require__(/*! ./src/chatUI */ "./client/src/chatUI.js"),
  render = _require2.render;

// Add a timeout delay to show a "Loading" indicator on the UI
setTimeout(function () {
  fetchSession().then(function () {
    return fetchChat();
  }).then(function () {
    return render();
  });
  render();
  // Set up the event listener and polling for real-time updates
  initEventListener();
  initPollingChat();
}, 1000);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map