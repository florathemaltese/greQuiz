//sets up a server using Express.js that handles requests for user and chat-related functionality, serves static files, and listens for incoming requests on port 3000.
"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoute = require("./src/routes/userSessionRoutes");
const chatRoute = require("./src/routes/chatRoutes");
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("./public"));

app.use(userRoute);
app.use(chatRoute);

app.get("/", (req, res) => {
    res.send("It works!");
});
app.use((err, req, res, next) => {
    err.stack = undefined;
    console.error(err.stack);
    res.status(500).send('It does not work!');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));