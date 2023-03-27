"use strict";
// Importing necessary functions from external modules
const {
    initEventListener,
    fetchSession,
    fetchChat,
    initPollingChat,
} = require("./src/ChatAPI");
const { render } = require("./src/chatUI");

// Add a timeout delay to show a "Loading" indicator on the UI
setTimeout(() => {
    fetchSession()
        .then(() => fetchChat())
        .then(() => render());
    render();
    // Set up the event listener and polling for real-time updates
    initEventListener();
    initPollingChat();
}, 1000);