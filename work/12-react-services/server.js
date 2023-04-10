const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');
const wordObject = require('./wordObject');
const { SERVER } = require('./constants');


app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: SERVER.AUTH_MISSING });
        return;
    }
    res.json({ username });
});

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

app.get('/word', (req, res) => {
    const username = req.cookies.sid ? sessions.getSessionUser(req.cookies.sid) : '';
    res.json(users.getUserData(username).getWord());
});

app.patch('/word', (req, res) => {
    const username = req.cookies.sid ? sessions.getSessionUser(req.cookies.sid) : '';

    const word = req.body.word;
    if (!word) {
        res.status(400).json({ error: SERVER.REQUIRED_WORD });
        return;
    }

    const userData = users.getUserData(username);
    if (!userData) {
        users.setUserData(username, wordObject.makeWordObject());
        userData = users.getUserData(username);
    }
    userData.updateWord(word);
    res.json(userData.getWord());
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));