"use strict";
// imports the Express.js framework into the module
const express = require("express");
// imports three functions
const {
    fetchCurrentSession,
    createSession,
    deleteSession,
} = require("../handler/userSessionHandler");
// creates a new router object that will handle HTTP requests
const router = express.Router();
// HTTP GET
router.get("/api/v1/user", fetchCurrentSession);
// HTTP PUT
router.put("/api/v1/user", createSession);
// HTTP DELETE
router.delete("/api/v1/user", deleteSession);
// exports the router object so that it can be used in other parts of the application
module.exports = router;