const { messages, users } = require("./chat");

const chatWeb = {
    chatPage: function (chat) {
        // Fill in/modify anything below!
        return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="chat.css">
        </head>
        <body>
          <header>
            <h1 class="title">Chatting Space</h1>
          </header>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
    },

    getMessageList: function (chat) {
        return `<ol class="messages">`+
            // Fill in
            // Generate the HTML for the list of messages
            Object.values(chat.messages).map(messages => `
      <li class="message-frame">
        <div class="message">
          <div class="sender-info">
            <img class="avatar" alt="avatar of ${messages.sender}" src="/images/avatar-${messages.sender}.jpg">
            <span class="username">${messages.sender}</span>
          </div>
          <p class="message-text">${messages.text}</p>
        </div>
      </li>
      `).join('')+
            `</ol>`;
    },
    getUserList: function (chat) {
        return `<ul class="users">` +
            Object.values(chat.users).map(user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
            `</ul>`;
    },
    getOutgoing: function () {
        // Fill in
        // Generate the HTML for a form to send a message
        return `<div class="outgoing">
              <form class="form" action="/chat" method="post">
                <input class="sender" type="hidden" value="Amit" placeholder="Sender"/>
                <input class="to-send" name="text" type="text" value="" placeholder="Enter message to send"/>
                <button class="form-button" type="submit">Send</button>
              </form>
            </div>`;
    }
};
module.exports = chatWeb;

