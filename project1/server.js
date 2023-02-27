const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 3000;

const words = require("./words");
const guessingGame = require("./guessing-game");
const login = require("./login");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./public"));

// Initialize variables and objects
const sessions = {};
const gameinfo = {};
const gamescore = {};
const gamestatus = {};
let secretWord = "";

app.get("/", (req, res) => {
    const sid = req.cookies.sid;

    // Check if session exists
    if (sid && sessions[sid]) {
        const username = sessions[sid].username;

        // Initialize user data if it doesn't exist
        gameinfo[username] = gameinfo[username] || {};
        gamestatus[username] = gamestatus[username] || {};
        gamescore[username] = gamescore[username] || 0;

        // Render game page with user data
        res.send(
            guessingGame.homePage(words, username, gameinfo, gamescore, gamestatus)
        );
        return;
    }

    // Render login page if session doesn't exist
    res.send(login.loginPage());
});

app.post("/guess", (req, res) => {
    const guessInput = req.body.guessword.trim();
    const sid = req.cookies.sid;

    // Check if session exists
    if (!sessions[sid]) {
        res.send(login.loginPage("invalidSessionId"));
        return;
    }

    const username = sessions[sid].username;

    // Check if guess input is valid
    if (!words.includes(guessInput) || gameinfo[username][guessInput]) {
        gamestatus[username]["InputStatus"] = "invalid";
    } else {
        // Update user data for valid guess
        if (guessingGame.exactMatch(guessInput, secretWord)) {
            gamestatus[username]["InputStatus"] = "correct";
        } else {
            gamestatus[username]["InputStatus"] = "valid";
        }
        const num = guessingGame.findMatchLetters(guessInput, secretWord);
        gameinfo[username][guessInput] = num;
        gamescore[username]++;
        gamestatus[username]["mostRecentGuess"] = guessInput;
        gamestatus[username]["lettersMatch"] = num;
    }

    // Redirect to homepage to update game page
    res.redirect("/");
});

app.post("/new-game", (req, res) => {
    const sid = req.cookies.sid;

    // Check if session exists
    if (!sessions[sid]) {
        res.send(login.loginPage("invalidSessionId"));
        return;
    }

    const username = sessions[sid].username;

    // Start new game for user
    secretWord = guessingGame.pickWord(words);
    console.log(`Username: ${username}, Secret Word: ${secretWord}`);
    gameinfo[username] = {};
    gamestatus[username] = {};
    gamescore[username] = 0;
    res.redirect("/");
});

app.post("/login", (req, res) => {
    const username = req.body.username.trim();
    const regex = /^[a-zA-Z0-9_-]{4,16}$/;

    // Validate username
    if (username === "dog" || !username || !username.match(regex)) {
        res.status(401).send(login.loginPage("invalidUsername"));
        return;
    }

    // Create new session for user
    const sid = uuidv4();
    sessions[sid] = { username };
    res.cookie("sid", sid);

    if (!gameinfo[username]) {
        secretWord = guessingGame.pickWord(words);
        console.log(`Username: ${username}, Secret Word: ${secretWord}`);
    }

    res.redirect("/");
});

app.post("/logout", (req, res) => {
    const sid = req.cookies.sid;

    delete sessions[sid];
    res.cookie("sid", { maxAge: 0 });
    res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

