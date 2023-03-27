"use strict";
// Import dependencies
const { render, renderChat } = require("./chatUI");
const storage = require("./storage");

// Fetch session data from the server
const fetchSession = () => {
    // Send a GET request to the server
    return fetch("/api/v1/user")
        .then(res => {
            // If the response is not OK, reject the promise with the error
            if (!res.ok) {
                return res.json().then(err => Promise.reject({ err }));
            }
            // Otherwise, parse the response as JSON
            return res.json();
        })
        .then(({ username, sid, loggedInUserList }) => {
            // Update the storage object with the session data
            storage.username = username;
            storage.sid = sid;
            storage.loggedInUser = loggedInUserList;
        });
};


// create a new session
const createSession = (username) => {
    return fetch("/api/v1/user", {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ username }),
    })
        .then((res) => {
            if (!res.ok) {
                return res.json().then((err) => Promise.reject({ err }));
            }
            return res.json();
        })
        .then((res) => {
            const { username, sid, loggedInUserList } = res;
            storage.username = username;
            storage.sid = sid;
            storage.loggedInUser = loggedInUserList;
        });
};
// delete session
const deleteSession = () => {
    return fetch("/api/v1/user", {
        method: "DELETE",
    })
        .catch((err) => Promise.reject({ err }))
        .then((res) => {
            if (!res.ok) {
                return res.json().then((err) => Promise.reject(err));
            }
            return res.json();
        })
        .then(() => {
            storage.username = undefined;
            storage.sid = undefined;
            storage.curChat = [];
        });
}
// Fetches the chat messages
const fetchChat = () => {
    return fetch("/api/v1/chat")
        .then((res) => {
            if (!res.ok) {
                return res.json().then((err) => Promise.reject({ err }));
            }
            return res.json();
        })
        .then((chatArr) => {
            if (chatArr) {
                storage.curChat = chatArr;
            }
        });
}
// Sends messages to the server
const sendMessage = (message) => {
    return fetch("/api/v1/chat", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ message }),
    });
};

// Initializes the event listeners for the app
const initEventListener = () => {
    const appEl = document.querySelector("#app");
    appEl.addEventListener("click", (e) => {
        e.preventDefault();
        switch (e.target.className) {
            case "user-login-submit":
                const username = document.querySelector(".user-login-input").value;
                createSession(username)
                    .then(() => fetchChat())
                    .then(() => render())
                    .catch(() => render());
                break;
            case "logout-button":
                deleteSession().then(() => render());
                break;
            case "new-message-submit":
                const message = document.querySelector(".new-message-input").value;
                storage.messageDraft = "";
                sendMessage(message)
                    .catch((err) => render())
                    .then(() => fetchChat())
                    .then(() => render());
                break;
            default:
                break;
        }
    });

    const chatInputEl = document.querySelector("#app .new-message");
    chatInputEl.addEventListener("input", (e) => {
        e.preventDefault();
        storage.messageDraft = e.target.value;
    });
}



// Initializes the polling for new chat messages
const initPollingChat = () => {
    setInterval(() => {
        return fetchSession()
            .then(() => fetchChat())
            .then(() => renderChat());
    }, 5000);
}

module.exports = {
    fetchSession,
    createSession,
    deleteSession,
    fetchChat,
    sendMessage,
    initEventListener,
    initPollingChat,
};