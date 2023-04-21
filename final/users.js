const users = {};

// Takes a "username" as an argument and validates it.
function isValid(username){
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
};

// Takes a "username" as an argument and returns the data associated with that username from the "users" object.
function getUserData(username) {
    return users[username];
};

// takes a "username" and "userData" as arguments and sets the "userData" in the "users" object with the "username" as the key.
function setUserData(username,userData){
    users[username] = userData;
};


module.exports = {
    isValid,
    getUserData,
    setUserData,
};