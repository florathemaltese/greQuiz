const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

// Set the default port to 3000 or use the value from the environment variable PORT.
const PORT = process.env.PORT || 3000;

// Import custom modules.
const sessions = require('./sessions');
const users = require('./users');
const wordObject = require('./wordObject');
const { SERVER } = require('./constants');

// Middleware for parsing cookies.
app.use(cookieParser());
// Middleware for serving static files from the './build' directory.
app.use(express.static('./build'));
// Middleware for parsing JSON in the request body.
app.use(express.json());

// GET endpoint for retrieving session information.
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: SERVER.AUTH_MISSING });
        return;
    }
    res.json({ username });
});

// POST endpoint for creating a new session.
app.post('/api/session', (req, res) => {

    const { username } = req.body;
    if (!users.isValid(username)) {
        res.status(400).json({ error: SERVER.REQUIRED_USERNAME });
        return;
    }
    if (username === 'dog') {
        res.status(403).json({ error: SERVER.AUTH_INSUFFICIENT });
        return;
    }
    const sid = sessions.addSession(username);
    const curUserData = users.getUserData(username);

    if (!curUserData) {
        users.setUserData(username, wordObject.makeWordObject());
    }

    const word = users.getUserData(username).getWord();

    res.cookie('sid', sid);
    res.json({ word });
});

// DELETE endpoint for deleting a session.
app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (sid) {
        res.clearCookie('sid');
    }
    if (username) {
        sessions.deleteSession(sid);
    }
    res.json({ username });
});

// GET endpoint for retrieving word data.
app.get('/word', (req, res) => {
    const username = req.cookies.sid ? sessions.getSessionUser(req.cookies.sid) : '';
    res.json(users.getUserData(username).getWord());
});

// PATCH endpoint for updating word data.
app.patch('/word', (req, res) => {
    const username = req.cookies.sid ? sessions.getSessionUser(req.cookies.sid) : '';

    const word = req.body.word;
    if (!word) {
        res.status(400).json({ error: SERVER.REQUIRED_WORD });
        return;
    }

    let userData = users.getUserData(username);
    if (!userData) {
        users.setUserData(username, wordObject.makeWordObject());
        userData = users.getUserData(username);
    }
    userData.updateWord(word);
    res.json(userData.getWord());
})

// Start listening on the specified port
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));