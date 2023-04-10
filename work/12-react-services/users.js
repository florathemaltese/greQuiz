const users = {};

function isValid(username){
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
};

function getUserData(username) {
    return users[username];
};

function setUserData(username,userData){
    users[username] = userData;
};


module.exports = {
    isValid,
    getUserData,
    setUserData,
};