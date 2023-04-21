// Importing the 'v4' method from the 'uuid' library to generate UUIDs for session IDs.
const uuid = require('uuid').v4;

// Creating an empty object to store session data.
const sessions = {};

// Function to add a session
function addSession(username){
    const sid = uuid();
    sessions[sid] = {
        username,
    };
    return sid;
};

// Function to get the username associated with a given session ID ('sid')
function getSessionUser(sid){
    return sessions[sid]?.username;
};

// Function to delete a session
function deleteSession(sid){
    delete sessions[sid];
};

// Exporting the session-related functions to be used in other modules
module.exports = {
    addSession,
    getSessionUser,
    deleteSession,
};