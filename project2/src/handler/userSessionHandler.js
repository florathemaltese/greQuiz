"use strict";
const uuid = require("uuid").v4;
const storage = require("../storage.js");

const sessions = storage.sessions;

// retrieves the current user's session data, including their username, session ID, and a list of all logged-in users.
const fetchCurrentSession = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : "";
    if (!sid || !username) {
        res.status(401).json({ error: "auth-missing" });
        return;
    }
    const loggedInUserList = getAllUser();
    res.json({ username, sid, loggedInUserList });
}

//creates a new session for a user with the given username, adds them to the list of logged-in users, and sets a session cookie containing the new session ID
const createSession = (req, res) => {
    const { username } = req.body;

    if (!isValidUsername(username)) {
        res.status(400).json({ error: "required-username" });
        return;
    }

    if (username === "dog") {
        res.status(403).json({ error: "auth-insufficient" });
        return;
    }

    const { sid, newUsername } = addSession(username);
    const loggedInUserList = getAllUser();

    res.cookie("sid", sid);
    res.json({ username: newUsername, sid, loggedInUserList });
};


// deletes the current user's session (identified by the session ID in the cookie) and removes them from the list of logged-in users.
const deleteSession = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : "";

    if (sid) {
        res.clearCookie("sid");
    }

    if (username) {
        // Delete the session, but not the user data
        deleteSessionWithId(sid);
    }

    res.json({ wasLoggedIn: !!username });
};


// validates whether a given username is valid or not
const isValidUsername = (username) => {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
};

// creates a new session for a given user and returns a new session ID and username
const addSession = (username) => {
    const sid = uuid();
    sessions[sid] = {
        username: username,
    };
    const newUsername = sessions[sid].username;
    return { sid, newUsername };
}

// retrieves the username associated with a given session ID
const getSessionUser = (sid) => {
    return sessions[sid]?.username;
}

// deletes a session given its session ID.
const deleteSessionWithId = (sid) => {
    delete sessions[sid];
}

// returns an array of all logged-in users
// returns an array of all logged-in users
const getAllUser = (sid) => {
    return Object.keys(sessions).map((sid) => sessions[sid]?.username);
}

module.exports = {
    fetchCurrentSession,
    createSession,
    deleteSession,
    getSessionUser,
};