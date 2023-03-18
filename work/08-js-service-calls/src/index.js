const controller = require("./controller.js");
const react = require("./react.js");
controller.initEventListener();
// Render for a resumed session
controller.user.fetchSession().then(() => react.render());
// Render for a new session
react.render();