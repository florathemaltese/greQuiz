"use strict";
// imports the Express.js framework into the module
const express = require("express");
// imports the postMessage and fetchConversation functions
const { postChatHistory, fetchChatHistory} = require("../handler/chatDialog");
// creates a new router object for handling HTTP requests
const router = express.Router();
// specifies routes for handling HTTP GET/POST requests
router.get("/api/v1/chat", fetchChatHistory);
router.post("/api/v1/chat", postChatHistory);
// exports the router object so that it can be used in other parts of the application
module.exports = router;