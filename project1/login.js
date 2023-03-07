const login = {
    loginPage: function(status) {
        return `
        <!doctype html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="style.css">
              <title>Login</title>
            </head>
            <body>
              <div class="login-page">
                ${login.getStatus(status)}
                <form action="/login" method="POST" class="login-form">
                  Username: <input name="username">
                  <button type="submit">Login</button>
                </form>
              </div>
              <script src="front-end.js"></script>
            </body>
          </html>
        `;
    },

    getStatus: function(status) {
        if(status === "invalidSessionId") {
            return `
            <p>Invalid session id, please login again.</p>
            `;
        }else if(status ==="invalidUsername") {
            return `
            <p>INVALID username! please try again.</p>
            `;
        }else {
            return `
            <p>Please login.</p>
            `;
        }
    }
};
module.exports = login;
