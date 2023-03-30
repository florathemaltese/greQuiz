"use strict";
// Require the storage module
const storage = require("./storage");

// Define a function to render the whole UI
const render = () => {
    renderUserLogin();
    renderUserlist();
    renderChat();
    renderMessageInput();
};

// Define a function to render the list of logged-in users
const renderUserlist = () => {
    const userlistEl = document.querySelector(".loggedin-users");
// If the username and session ID are not set in the storage, clear the userlist element
    if (!storage.username || !storage.sid) {
        userlistEl.innerHTML = "";
        return;
    }
    const userlistHTML = storage.loggedInUser
        .map((username) => "<li class='user-list-item'>" + username + "</li>")
        .join("");
    userlistEl.innerHTML = "<p>User Name:</p><ul class=user-list>" + userlistHTML + "</ul>";
};

// Define a function to render the chat messages
const renderChat = () => {
    const chatEl = document.querySelector(".chat");
    // If the username is not set in the storage, clear the chat element
    if (!storage.username) {
        chatEl.innerHTML = "";
        return;
    }

// If there are chat messages in the storage, render them
// Otherwise, display a message indicating that there are no chat messages yet
    const chatArr = storage.curChat;
    let chatListItemHTML = "";
    for (let i = 0; i < chatArr.length; i++) {
        if (!chatArr[i]) {
            continue;
        }

        const username = Object.keys(chatArr[i])[0];
        const message = chatArr[i][username];

        chatListItemHTML += "<li class='chat-list-item'>" + username + ": " + message + "</li>";
    }

    chatEl.innerHTML = chatListItemHTML
        ? "<p>Chat History: </p><ul class=chat-list>" + chatListItemHTML + "<ul>"
        : "<p class='chat-list empty'>You do not have any chat yet.</p>";

// Scroll to the end of the chat element
    chatEl.scroll(0, chatEl.scrollHeight);
}

const renderUserLogin = () => {
    const userEl = document.querySelector(".user");
// If the username and session ID are set in the storage, render a logged-in user view
    if (storage.username && storage.sid) {
        userEl.innerHTML = "<span class='username-prompt'>User Name <span class='username'>" + storage.username + "</span>.</span> <button class='logout-button'>Log out</button>";
    }
// Otherwise, render a login form
    else {
        userEl.innerHTML = "<form action=''>" +
            "<span class='login-prompt'>Please log in</span>" +
            "<label>:" +
            "<input type='text' class='user-login-input' placeholder='Username'>" +
            "</label>" +
            "<button type='submit' class='user-login-submit'>Log In</button>" +
            "</form>";
    }
};

const renderMessageInput = () => {
    const messageInputEl = document.querySelector(".new-message");
    if (!storage.username) {
        messageInputEl.innerHTML = "";
        return;
    }

    messageInputEl.innerHTML = `
  <form action="">
    <label>
      Send Message:
      <input type="text" placeholder="Message" class="new-message-input" value=${storage.messageDraft}>
    </label>
    <button type="submit" class="new-message-submit">Send</button>
  </form>
  `;
}

module.exports = { render, renderChat };