"use strict";

// holds data that will be shared across different modules
const storage = {
    // An object that will hold session data
    sessions: {},
    // An array of objects where each object represents a chat message; elements are in {sender username: message}
    chatHistory: [],
};

// Exports the storage object so that other modules can use it
module.exports = storage;