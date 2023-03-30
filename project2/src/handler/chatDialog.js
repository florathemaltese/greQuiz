"use strict";
const { chatHistory } = require("../storage");
const { getSessionUser } = require("./userSessionHandler");

// retrieves chat history
const fetchChatHistory = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : "";
    if (!sid || !username) {
        res.status(401).json({ error: "auth-insufficient" });
        return;
    }
    res.json(chatHistory);
}

// posts Chat
const postChatHistory = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : "";
    if (!sid || !username) {
        res.status(401).json({ error: "auth-insufficient" });
        return;
    }
    const { message } = req.body;
    chatHistory[chatHistory.length] = { [username]: message };
    res.json({ username, message });
};

module.exports = { fetchChatHistory, postChatHistory };
